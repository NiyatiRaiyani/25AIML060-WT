<?php
require_once __DIR__.'/../includes/bootstrap.php';
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
try {
  if ($_SERVER['REQUEST_METHOD']==='GET') {
    $rows=db()->query("SELECT id,title,description,event_date,venue,category FROM events WHERE status='published' ORDER BY event_date")->fetchAll();
    echo json_encode(['success'=>true,'data'=>$rows],JSON_UNESCAPED_UNICODE); exit;
  }
  http_response_code(405); header('Allow: GET'); echo json_encode(['success'=>false,'message'=>'Method not allowed']);
} catch(Throwable $e) { http_response_code(500); echo json_encode(['success'=>false,'message'=>'Unable to load events']); }
