pipeline {
    agent any

    tools {
        // Specify the name of the Node.js installation you configured
        nodejs 'NodeJS 20.x' 
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Now, `npm` will be found in the PATH
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