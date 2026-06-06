pipeline {
    agent any

    environment {
        IMAGE_NAME = 'de-maize-static'
        CONTAINER_NAME = 'de-maize-app'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Pulling latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running smoke test...'
                sh 'docker run --rm ${IMAGE_NAME} node -e "console.log(\'server.js exists:\', require(\'fs\').existsSync(\'server.js\'))"'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'docker stop ${CONTAINER_NAME} || true'
                sh 'docker rm ${CONTAINER_NAME} || true'
                sh 'docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}'
                echo 'App is live at http://localhost:3000'
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed — check the logs above'
        }
    }
}