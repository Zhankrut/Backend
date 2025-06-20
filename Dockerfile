# Step 1: Use Amazon Linux Node.js Lambda base image

FROM public.ecr.aws/lambda/nodejs:18
WORKDIR /var/task
# Step 2: Copy app files

COPY . .

# Step 3: Install dependencies

RUN npm install

# Step 4: Set the Lambda function entrypoint

CMD ["src/lambda.funcName"]

