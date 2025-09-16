pipeline {
    agent any

    tools {
        // This name must match the NodeJS installation name in Jenkins Global Tool Configuration
        nodejs 'NodeJS'
    }

    stages {
        stage('Check Node & npm') {
            steps {
                script {
                    // Use bat for Windows, sh for Linux/Mac
                    if (isUnix()) {
                        sh 'node -v'
                        sh 'npm -v'
                    } else {
                        bat 'node -v'
                        bat 'npm -v'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test -- --ci --coverage'
                    } else {
                        bat 'npm test -- --ci --coverage'
                    }
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Archive Production Build') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Build completed successfully!'
        }
        failure {
            echo '❌ Build failed. Check the logs above.'
        }
    }
}
