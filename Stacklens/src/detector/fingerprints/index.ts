import type { Fingerprint } from '@/types';

import { react } from './frontend/react';
import { reactRouter } from './frontend/react-router';
import { vue } from './frontend/vue';
import { angular } from './frontend/angular';
import { nextjs } from './frontend/nextjs';
import { nuxt } from './frontend/nuxt';
import { svelte } from './frontend/svelte';
import { gatsby } from './frontend/gatsby';
import { jquery } from './frontend/jquery';
import { jqueryUi } from './frontend/jquery-ui';
import { preact } from './frontend/preact';
import { hammerjs } from './frontend/hammerjs';
import { redux } from './frontend/redux';
import { typescript } from './frontend/typescript';
import { corejs } from './frontend/corejs';
import { alpinejs } from './frontend/alpinejs';
import { solidjs } from './frontend/solidjs';
import { lit } from './frontend/lit';
import { stimulus } from './frontend/stimulus';
import { turbo } from './frontend/turbo';
import { lodash } from './frontend/lodash';
import { momentjs } from './frontend/momentjs';
import { googleFonts } from './frontend/google-fonts';
import { htmx } from './frontend/htmx';
import { remix } from './frontend/remix';
import { ember } from './frontend/ember';
import { threejs } from './frontend/threejs';
import { d3 } from './frontend/d3';
import { chartjs } from './frontend/chartjs';
import { gsap } from './frontend/gsap';
import { axiosFp } from './frontend/axios';
import { rxjs } from './frontend/rxjs';
import { framerMotion } from './frontend/framer-motion';
import { playwright } from './frontend/playwright';
import { storybook } from './frontend/storybook';
import { pwa } from './general/pwa';
import { openGraph } from './general/open-graph';
import { priorityHints } from './general/priority-hints';
import { http3 } from './general/http3';
import { youtube } from './general/youtube';
import { googleMaps } from './general/google-maps';
import { facebookSdk } from './general/facebook-sdk';
import { twitterWidgets } from './general/twitter-widgets';
import { intercom } from './general/intercom';
import { hubspot } from './general/hubspot';
import { zendesk } from './general/zendesk';
import { amp } from './general/amp';
import { brightcove } from './general/brightcove';
import { requirejs } from './general/requirejs';
import { jss } from './general/jss';
import { akamaiMpulse } from './general/akamai-mpulse';
import { jwplayer } from './general/jwplayer';
import { videojs } from './general/videojs';
import { onetrust } from './general/onetrust';

import { nodejs } from './backend/nodejs';
import { express } from './backend/express';
import { nextdotjs } from './backend/next';
import { java } from './backend/java';
import { spring } from './backend/spring';
import { python } from './backend/python';
import { django } from './backend/django';
import { flask } from './backend/flask';
import { php } from './backend/php';
import { dotnet } from './backend/dotnet';
import { ruby } from './backend/ruby';
import { go } from './backend/go';
import { tomcat } from './backend/tomcat';
import { jetty } from './backend/jetty';
import { puma } from './backend/puma';
import { kestrel } from './backend/kestrel';

import { tailwind } from './css/tailwind';
import { bootstrap } from './css/bootstrap';
import { materialui } from './css/materialui';
import { chakra } from './css/chakra';
import { mantine } from './css/mantine';
import { fontAwesome } from './css/font-awesome';
import { bulma } from './css/bulma';
import { emotion } from './css/emotion';

import { wordpress } from './cms/wordpress';
import { shopify } from './cms/shopify';
import { webflow } from './cms/webflow';
import { drupal } from './cms/drupal';
import { wix } from './cms/wix';
import { squarespace } from './cms/squarespace';
import { joomla } from './cms/joomla';
import { strapi } from './cms/strapi';
import { contentful } from './cms/contentful';
import { sanity } from './cms/sanity';
import { ghost } from './cms/ghost';
import { jetpack } from './cms/jetpack';
import { elementor } from './cms/elementor';

import { mongodb } from './database/mongodb';
import { mysql } from './database/mysql';
import { postgresql } from './database/postgresql';
import { redis } from './database/redis';
import { firebase as firebaseDB } from './database/firebase';
import { supabase } from './database/supabase';
import { prisma } from './database/prisma';
import { mariadb } from './database/mariadb';
import { couchdb } from './database/couchdb';
import { planetscale } from './database/planetscale';

import { cloudflare } from './hosting/cloudflare';
import { aws } from './hosting/aws';
import { vercel } from './hosting/vercel';
import { netlify } from './hosting/netlify';
import { githubPages } from './hosting/github-pages';
import { azure } from './hosting/azure';
import { amazonS3 } from './hosting/amazon-s3';
import { amazonWebServices } from './hosting/amazon-web-services';
import { envoy } from './hosting/envoy';
import { cloudfront } from './hosting/cloudfront';
import { akamai } from './hosting/akamai';
import { nginx } from './hosting/nginx';
import { apache } from './hosting/apache';
import { caddy } from './hosting/caddy';
import { litespeed } from './hosting/litespeed';
import { lighttpd } from './hosting/lighttpd';
import { opengse } from './hosting/opengse';
import { heroku } from './hosting/heroku';
import { digitalocean } from './hosting/digitalocean';
import { fastly } from './hosting/fastly';
import { jsdelivr } from './hosting/jsdelivr';
import { dockerFp } from './hosting/docker';
import { kubernetes } from './hosting/kubernetes';
import { haproxy } from './hosting/haproxy';
import { traefik } from './hosting/traefik';
import { cloudflareWorkers } from './hosting/cloudflare-workers';
import { googleCloud } from './hosting/google-cloud';
import { uvicorn } from './hosting/uvicorn';
import { iis } from './hosting/iis';
import { gunicorn } from './hosting/gunicorn';
import { pagination } from './general/pagination';

import { googleAnalytics } from './analytics/google-analytics';
import { googleTagManager } from './analytics/google-tag-manager';
import { hotjar } from './analytics/hotjar';
import { mixpanel } from './analytics/mixpanel';
import { facebookPixel } from './analytics/facebook-pixel';
import { clarity } from './analytics/clarity';
import { linkedinAds } from './analytics/linkedin-ads';
import { rubiconProject } from './analytics/rubicon-project';
import { boomerang } from './analytics/boomerang';
import { sentry } from './analytics/sentry';
import { newRelic } from './analytics/new-relic';
import { segment } from './analytics/segment';
import { amplitude } from './analytics/amplitude';
import { fullstory } from './analytics/fullstory';
import { matomo } from './analytics/matomo';
import { plausible } from './analytics/plausible';
import { datadog } from './analytics/datadog';
import { logrocket } from './analytics/logrocket';
import { rollbarFp } from './analytics/rollbar';
import { bugsnag } from './analytics/bugsnag';
import { amazonAds } from './advertising/amazon-ads';
import { googleAds } from './advertising/google-ads';
import { criteo } from './advertising/criteo';
import { taboola } from './advertising/taboola';
import { theTradeDesk } from './advertising/the-trade-desk';

import { hsts } from './security/hsts';
import { csp } from './security/csp';
import { cloudflareSecurity } from './security/cloudflare-security';
import { arkoseLabs } from './security/arkose-labs';
import { recaptcha } from './security/recaptcha';
import { hcaptcha } from './security/hcaptcha';
import { sectigo } from './security/sectigo';
import { digicert } from './security/digicert';

import { firebaseAuth } from './auth/firebase-auth';
import { auth0 } from './auth/auth0';
import { okta } from './auth/okta';
import { clerk } from './auth/clerk';

import { stripe } from './payments/stripe';
import { paypal } from './payments/paypal';
import { square } from './payments/square';
import { braintree } from './payments/braintree';

import { openai } from './ai/openai';
import { huggingface } from './ai/huggingface';
import { langchain } from './ai/langchain';
import { anthropic } from './ai/anthropic';
import { gemini } from './ai/gemini';
import { cohere } from './ai/cohere';
import { replicate } from './ai/replicate';
import { llamaindex } from './ai/llamaindex';

import { webpack } from './build-tools/webpack';
import { vite } from './build-tools/vite';
import { esbuild } from './build-tools/esbuild';
import { babel } from './build-tools/babel';
import { rollup } from './build-tools/rollup';
import { parcel } from './build-tools/parcel';
import { pnpm } from './build-tools/pnpm';
import { bun } from './build-tools/bun';
import { yarn } from './build-tools/yarn';

import { woocommerce } from './e-commerce/woocommerce';
import { magento } from './e-commerce/magento';
import { bigcommerce } from './e-commerce/bigcommerce';

import { hugo } from './ssg/hugo';
import { astro } from './ssg/astro';
import { docusaurus } from './ssg/docusaurus';

import { varnish } from './caching/varnish';

import { sendgrid } from './email/sendgrid';
import { mailgun } from './email/mailgun';
import { postmark } from './email/postmark';
import { mailchimp } from './email/mailchimp';
import { convertkit } from './email/convertkit';

import { adobeFonts } from './font-script/adobe-fonts';

import { mapbox } from './map/mapbox';
import { leaflet } from './map/leaflet';

import { marketo } from './marketing-automation/marketo';
import { activecampaign } from './marketing-automation/activecampaign';

import { jenkins } from './devops/jenkins';
import { githubActions } from './devops/github-actions';
import { circleci } from './devops/circleci';
import { gitlabCi } from './devops/gitlab-ci';

export const fingerprints: Fingerprint[] = [
  react, reactRouter, vue, angular, nextjs, nuxt, svelte, gatsby, jquery, jqueryUi, preact, hammerjs, redux, typescript, corejs,
  alpinejs, solidjs, lit, stimulus, turbo,
  lodash, momentjs, googleFonts,
  htmx, remix, ember, threejs, d3, chartjs, gsap, axiosFp, rxjs,
  pwa, openGraph, priorityHints, http3, requirejs, jss, akamaiMpulse,
  youtube, googleMaps, facebookSdk, twitterWidgets, intercom, hubspot, zendesk, amp, brightcove,
  jwplayer, videojs, onetrust,
  nodejs, express, nextdotjs, java, spring, python, django, flask, php, dotnet, ruby, go, tomcat, jetty, puma, kestrel,
  tailwind, bootstrap, materialui, chakra, mantine, fontAwesome, bulma,
  wordpress, shopify, webflow, drupal, wix, squarespace,
  mongodb, mysql, postgresql, redis, firebaseDB,
  cloudflare, aws, vercel, netlify, githubPages, azure, amazonS3, amazonWebServices, envoy,
  cloudfront, akamai, nginx, apache, caddy, litespeed, lighttpd, opengse,
  heroku, digitalocean, fastly, jsdelivr, haproxy, traefik,
  dockerFp, kubernetes,
  googleAnalytics, googleTagManager, hotjar, mixpanel, facebookPixel, clarity,
  linkedinAds, rubiconProject, boomerang, sentry, newRelic, segment, amplitude, fullstory,
  matomo, plausible, datadog, logrocket, rollbarFp, bugsnag,
  amazonAds, googleAds, criteo, taboola, theTradeDesk,
  hsts, csp, cloudflareSecurity, arkoseLabs, recaptcha, hcaptcha,
  firebaseAuth, auth0, okta, clerk,
  stripe, paypal, square, braintree,
  openai,
  webpack, vite, esbuild, babel, rollup, parcel,
  woocommerce, magento, bigcommerce,
  hugo, astro, docusaurus,
  varnish,
  sendgrid,
  adobeFonts,
  mapbox, leaflet,
  supabase, prisma, mariadb, couchdb, planetscale,
  huggingface, langchain, anthropic, gemini, cohere, replicate, llamaindex,
  mailgun, postmark, mailchimp, convertkit,
  marketo, activecampaign,
  joomla, strapi, contentful, sanity, ghost, jetpack, elementor,
  jenkins, githubActions, circleci, gitlabCi,
  cloudflareWorkers, googleCloud, uvicorn, iis, gunicorn, pagination,
  emotion,
  framerMotion, playwright, storybook,
  pnpm, bun, yarn,
  sectigo, digicert,
];
