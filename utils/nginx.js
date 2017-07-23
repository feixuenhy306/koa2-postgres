server {
    listen 80;
    listen [::]:8082;//for ip v6
    server_name host_url;

    access_log /tmp/qrPaymentLogs/nginx.log;
    error_log /tmp/qrPaymentLogs/nginxError.log;
    location / {
       proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass  http://127.0.0.1:3333;
    }
}
