nginx Setup

sudo apt-get install Nginx

cd /etc/nginx/sites-available/

sudo vim node
copy paste following thing

ln -s /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node
----
server {
    listen 80;
    listen [::]:8082;//for ip v6
    server_name host_url;

    access_log /tmp/qrPaymentLogs/nginx.log;    //hit of nginx
    error_log /tmp/qrPaymentLogs/nginxError.log; // error log nginx
    location / {
       proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass  http://127.0.0.1:3333;
    }
}
----
