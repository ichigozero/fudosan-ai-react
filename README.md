# About
Japanese real estate price predictor app.

# Requirements
This web application has been tested in environment with
the following configuration:

# Installation
1. Clone this repo
2. Clone the submodule repository

   ```bash
   $ git submodule update --init --recursive
   ```

3. Create Python virtual environment for Flask backend

   ```bash
   $ cd api
   $ python3 -m venv venv
   $ source venv/bin/activate
   ```

4. Install required packages for Flask backend

    ```bash
    $ pip3 install .
    ```

5. Import and analyze real estate CSV data

    ```bash
    $ flask cli analyze-rent-data [OPTIONS] CSV_PATH PREFECTURE_NAME
    ```

    Run the following command to import `rent_東京部.csv` of Tokyo prefecture.

    ```bash
    $ flask cli analyze-rent-data rent_東京部.csv 東京部
    ```

6. Build React app

    ```bash
    cd .. && $ npm build
    ```

7. Create systemd service

    ```bash
    $ sudo touch /etc/systemctl/system/fudosan-ai.service
    ```

8. Add the following into fudosan-ai.service file.

    ```
    [Unit]
    Description=fudosan-ai
    After=network.target

    [Service]
    User=ubuntu
    WorkingDirectory=/home/ubuntu/fudosan-ai-react/api
    ExecStart=/home/ubuntu/fudosan-ai-react/api/venv/bin/gunicorn -b 127.0.0.1:5002 "app:create_app()"
    Restart=always

    [Install]
    WantedBy=multi-user.target
    ```

9. Configure Nginx

    Edit `etc/nginx/sites-enabled/default`

    ```
    server {
        listen 80;

        location /fudosan-ai {
            alias /home/ubuntu/fudosan-ai-react/build;
            index index.html;
            try_files $uri $uri/ /fudosan-ai/index.html;
        }

        location /fudosan-ai/api {
            include proxy_params;
            proxy_pass http://localhost:5002;
        }
    }
    ```

10. Reload systemd and start fudosan-ai service

   ```bash
   $ sudo systemctl daemon-reload
   $ sudo systemctl start fudosan-ai
   ```

11. (Optional) Verify that fudosan-ai service is running

   ```bash
   $ sudo systemctl status fudosan-ai
   ```

12. Reload nginx

    ```bash
    $ sudo systemctl reload nginx
    ```

13. Verify that the web app is running by visiting `<IP or Host Name>/fudosan-ai`
