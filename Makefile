include .env

# ==================================================================================== #
# PRODUCTION
# ==================================================================================== #

## production/connect: connect to the production server
.PHONY: production/connect
production/connect:
	ssh ${PRODUCTION_USERNAME}@${PRODUCTION_HOST_IP}

## production/deploy/app: deploy app to production.
.PHONY: production/deploy/app
production/deploy/app:
	rsync -PE ./deployment/05-nextjs-deployment.sh ${PRODUCTION_USERNAME}@${PRODUCTION_HOST_IP}:~/scripts/
	ssh -t ${PRODUCTION_USERNAME}@${PRODUCTION_HOST_IP} 'cd scripts/ && ./05-nextjs-deployment.sh && cd'
	
	@echo "deployment complete..."
