# FotoVerifier: An Image Verification Tool-Suite
This is official reporitory for the FotoVerifier. The tool suite contains multiple tools for analyzing digital photos for evidence of tampering or manipulation. The tool is designed to help users detect and verify the authenticity of photos by analyzing various image properties, such as metadata, file format, and pixel values.

## Repository structure
```
FotoVerifier/
+--Dedigi		    An online platform for digital image forensics.     
+--FotoVerifier 	A training system for digital image forensics.       
+--NameSlueth		An online tool for uploaded image's filename analysis.	
+--cli        		A collection of python scripts for image forensics.
+--DivNoise                   An online tool for camera model identification
```

## Pubic Platform
* [Dedigi](https://dedigi.fotoverifier.eu/)
* [FotoVerifier](https://www.fotoverifier.eu/)
* [NameSleuth](https://namesleuth.fotoverifier.eu/)
* [DivNoise](https://divnoise.fotoverifier.eu/)

## Publications
* Chi-Hao Tran, Quoc-Thang Tran, Quynh-Chau Long-Vu, Hai-Son Nguyen, Anh-Duy Tran, and Duc-Tien Dang-Nguyen. 2022. [DeDigi: A Privacy-by-Design Platform for Image Forensics](https://dl.acm.org/doi/10.1145/3512731.3534213). In Proceedings of the 3rd ACM Workshop on Intelligent Cross-Data Analysis and Retrieval (ICDAR '22). Association for Computing Machinery, New York, NY, USA, 58–62. https://doi.org/10.1145/3512731.3534213
* Dang-Nguyen, Duc-Tien, Vegard Velle Sjøen, Dinh-Hai Le, Thien-Phu Dao, Anh-Duy Tran, and Minh-Triet Tran. [Practical Analyses of How Common Social Media Platforms and Photo Storage Services Handle Uploaded Images](https://arxiv.org/abs/2302.12133). arXiv.org, February 23, 2023. https://arxiv.org/abs/2302.12133. 

## Deployment
By default, port assignment for each service is:
- Dedigi: 3000
- FotoVerifier: 3001
- NameSleuth: 3002
- DivNoise: 3003
- DivNoise Demo: 3004

Please make sure that these ports are not occupied before starting deployment.

### Nginx configuration
There will be an Nginx served before these 4 services as a reverse-proxy server. It will then redirect the request to a correct service based on the host.

Copy the `nginx.conf` file to `/etc/nginx/nginx.conf` and run `service nginx start` to start the service

**SSL configuration**
Without the correct SSL certificate, Nginx won't run properly. We are using certbot's certificate in the current deployment. To host one for your own. You need to 
1. comment out all commands relating to https and ssl. 
2. run nginx to make sure it works properly on port 80. 
3. issue an ssl certificate from certbot.
4. replace the certificate path, uncomment ssl and https commands.
5. restart nginx to check if the website is working properly on https.

### DeDigi
We used `pm2` to effortlessly deploy a node server. Simply:
1. Install pm2: `npm i -g pm2`, sudo if needed
2. Install deps: `npm ci`
3. Deploy with pm2: `pm2 start npm -- start` (this should bind to localhost:3000 by default)

### FotoVerifier
Run `docker-compose up --build -d` to build the project and run on `localhost:3001`

### NameSleuth
Run the bash script `run.sh` to build the project and run on `localhost:3002`

### DivNoise
Run `docker build -t divnoise .` to build the docker image. Then for running the container `docker run -d -p 3004:3004 --name divnoise divnoise`.

## Contributing

## License
The project has been funded by [NORDIS](https://nordishub.eu/), European Horizon 2020 grant number 825469 and
Intelligent Information Systems (I2S) research group, University of Bergen, Norway.

## Contact
You can contact us at:
* Duc-Tien Dang-Nguyen: [ductien.dangnguyen@uib.no](ductien.dangnguyen@uib.no)
* Anh-Duy Tran: [anh-duy.tran@kuleuven.be](anh-duy.tran@kuleuven.be)
