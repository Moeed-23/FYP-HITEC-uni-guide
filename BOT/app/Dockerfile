FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy code into container
COPY . /app

# Install system dependencies (for faiss, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libopenblas-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port FastAPI runs on
EXPOSE 8000

# Start app
CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8000"]
