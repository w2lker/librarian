# Use the official Ruby image from Docker Hub
FROM ruby:3.2.2

RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash - \
    && apt-get install -y nodejs

RUN gem install bundler

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install --verbose

COPY . .

WORKDIR /app/client

COPY client/package.json client/package-lock.json ./

RUN npm install

RUN npm run build

RUN cp -r build/* ../public/

WORKDIR /app

EXPOSE 61601

ENV RAILS_ENV=production

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "61601"]
