pipeline {
    agent any

    tools {
        // Change 'NodeJS 20.x' to 'Nodejs'
        nodejs 'NodeJS'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test -- --ci --coverage'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}