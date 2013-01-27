<?php
// web/index.php

// web/index.php
require_once __DIR__.'/../vendor/autoload.php';
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

$app = new Silex\Application();
$app["debug"]=true;

$app->register(new Tobiassjosten\Silex\Provider\FacebookServiceProvider(), array(
    'facebook.app_id'     => 'YOUR_APP_ID',
    'facebook.secret'     => 'YOUR_APP_SECRET',
));


$app->register(new Silex\Provider\UrlGeneratorServiceProvider());




$app->register(new Silex\Provider\TwigServiceProvider(), array(
  'twig.path'       => __DIR__.'/../views'
));
$app["twig"]->addExtension( new Twig_Extensions_Extension_Text());

$app->get('/{friend_id}', function ($friend_id) use ($app) {
     $facebook=$app["facebook"];
     
     $friend = $facebook->api("/".$friend_id);
     $me = $facebook->api("/me");
     
    return $app["twig"]->render('application.html.twig',array("me"=>$me,"friend"=>$friend));
    
})->method("GET|POST");

$app->get('/api/publish', function (Request $request) use ($app) {
    $facebook=$app["facebook"];
    $facebook->api('/me/feed', 'POST', array( 'name' => 'TEST NAME', 
        'caption' => 'Test Caption', 
        'description' => 'Test Description', 
        'message' => '@[1199612263:1:test]', 
        'access_token' => $facebook->getAccessToken() ));
    
    return $request->get("user_id");
    
    
})->method("GET|POST");

$app->get('/', function () use ($app) {
    
    //return "HOLA";
    $facebook=$app["facebook"];
    //$output = '';
   $user= $app["facebook"]->getUser();
   
   if ($user) {
   $logoutUrl = $facebook->getLogoutUrl();
 $friends= $app["facebook"]->api("/me/friends");
 //return 
return $app["twig"]->render('template.html.twig',array("friends"=>$friends["data"]));
  // return $logoutUrl;
} else {
  $loginUrl = $facebook->getLoginUrl();
  return $app->redirect($loginUrl);
  //return $loginUrl;
}
   
    if($user){
        //login please.
    }else{
       
    }
 
        
})->method("GET|POST");
$app->run();
?>
