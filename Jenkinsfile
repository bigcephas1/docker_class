pipeline {
    agent any
    environment {
        IMAGE_PREFIX = 'peterukpabi4/todo_app'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/bigcephas1/docker_class.git', branch: 'main'
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_PREFIX}-server", './server')
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_PREFIX}-client", './client')
                }
            }
        }
        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_CRED', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }
        stage('Push Backend Image') {
            steps {
                sh "docker tag ${IMAGE_PREFIX}-server ${IMAGE_PREFIX}-server:latest"
                sh "docker push ${IMAGE_PREFIX}-server:latest"
            }
        }
        stage('Push Frontend Image') {
            steps {
                sh "docker tag ${IMAGE_PREFIX}-client ${IMAGE_PREFIX}-frontend:latest"
                sh "docker push ${IMAGE_PREFIX}-client:latest"
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}

