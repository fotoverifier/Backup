# Use an official Python runtime as the base image
FROM python:3.5.6-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .
# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application code to the container
COPY web_app/ .
# Copy the noiseprint folders to the container
COPY noiseprint/ /app/noiseprint/
COPY noiseprints/ /app/noiseprints/
#COPY prnu/ /app/prnu/

# Set the Flask app environment variable
ENV FLASK_APP=app.py

EXPOSE 3004

CMD ["python3", "app.py"]
