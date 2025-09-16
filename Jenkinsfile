pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Must match the name in Jenkins Global Tool Configuration
    }

    stages {
        stage('Check Node & npm') {
            steps {
                script {
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

        stage('Run Tests (if available)') {
            steps {
                script {
                    // Check if "test" script exists in package.json
                    def hasTestScript
                    if (isUnix()) {
                        hasTestScript = sh(script: "node -p \"require('./package.json').scripts.test ? 'yes' : 'no'\"", returnStdout: true).trim()
                    } else {
                        hasTestScript = bat(script: "node -p \"require('./package.json').scripts.test ? 'yes' : 'no'\"", returnStdout: true).trim()
                    }

                    if (hasTestScript == 'yes') {
                        echo 'Test script found — running tests...'
                        if (isUnix()) {
                            sh 'npm test -- --ci --coverage'
                        } else {
                            bat 'npm test -- --ci --coverage'
                        }
                    } else {
                        echo 'No test script found — skipping tests.'
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
