pipeline {
    agent any

    environment {
        IMAGE_NAME = 'de-maize-static'
        DOCKER_HUB_IMAGE = 'anishpandey735/de-maize-static'
        CONTAINER_NAME = 'de-maize-app'
        SONAR_PROJECT_KEY = 'de-maize-static'
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
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
                sh 'docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest'
            }
        }

        stage('Test') {
            steps {
                echo 'Running smoke test...'
                sh 'docker run --rm ${IMAGE_NAME}:latest node -e "console.log(\'server.js exists:\', require(\'fs\').existsSync(\'server.js\'))"'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube code analysis...'
                withSonarQubeEnv('sonarqube') {
                    sh """
                        docker run --rm \
                        --network host \
                        -e SONAR_HOST_URL=http://localhost:9000 \
                        -e SONAR_TOKEN=\$SONAR_AUTH_TOKEN \
                        -v "\$(pwd):/usr/src" \
                        sonarsource/sonar-scanner-cli \
                        -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                        -Dsonar.projectName="DE-MAIZE Static" \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=**/.next/**,**/node_modules/**
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker tag ${IMAGE_NAME}:latest ${DOCKER_HUB_IMAGE}:latest'
                    sh 'docker tag ${IMAGE_NAME}:latest ${DOCKER_HUB_IMAGE}:${BUILD_NUMBER}'
                    sh 'docker push ${DOCKER_HUB_IMAGE}:latest'
                    sh 'docker push ${DOCKER_HUB_IMAGE}:${BUILD_NUMBER}'
                    echo 'Pushed: ${DOCKER_HUB_IMAGE}:latest'
                    echo 'Pushed: ${DOCKER_HUB_IMAGE}:${BUILD_NUMBER}'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'docker stop ${CONTAINER_NAME} || true'
                sh 'docker rm ${CONTAINER_NAME} || true'
                sh 'docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest'
                echo 'App is live at http://localhost:3000'
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            echo 'Image available at: https://hub.docker.com/r/anishpandey735/de-maize-static'
        }
        failure {
            echo 'Pipeline failed — check the logs above'
        }
    }
}