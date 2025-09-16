pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test -- --ci --coverage' // The --ci flag runs tests in a non-interactive mode
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}