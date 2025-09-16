pipeline {
    agent any

    tools {
        // Must match the NodeJS installation name in Jenkins Global Tool Configuration
        nodejs 'NodeJS'
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
                    def hasTestScript
                    if (isUnix()) {
                        hasTestScript = sh(
                            script: "node -p \"require('./package.json').scripts.test ? 'yes' : 'no'\"",
                            returnStdout: true
                        ).trim()
                    } else {
                        hasTestScript = bat(
                            script: "node -p \"require('./package.json').scripts.test ? 'yes' : 'no'\"",
                            returnStdout: true
                        ).trim()
                    }

                    if (hasTestScript == 'yes') {
                        echo '✅ Test script found — running tests...'
                        if (isUnix()) {
                            sh 'npm test -- --ci --coverage'
                        } else {
                            bat 'npm test -- --ci --coverage'
                        }
                    } else {
                        echo '⚠ No test script found — skipping tests.'
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
                script {
                    // Detect whether dist/ or build/ exists
                    def outputDir = ''
                    if (fileExists('dist')) {
                        outputDir = 'dist/**'
                    } else if (fileExists('build')) {
                        outputDir = 'build/**'
                    } else {
                        error '❌ No build output folder found (dist/ or build/). Check your build step.'
                    }

                    echo "📦 Archiving artifacts from: ${outputDir}"
                    archiveArtifacts artifacts: outputDir, fingerprint: true
                }
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs above.'
        }
    }
}
