<?php

// some browser open download window for application/json
// content-type should be some text
// header("Content-Type: application/json; charset=utf-8");
header("Content-Type: text/javascript; charset=utf-8");
echo json_encode($_FILES['form-name']);