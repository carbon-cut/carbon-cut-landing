# MVP Deployment Decision

## Current Decision

- We are using **Hetzner** for hosting.
- Hetzner is a **German provider** with EU-hosted infrastructure options.
- It gives us a stronger **GDPR-aligned hosting posture** than a US-first platform.
- Hetzner also documents a strong **sustainability / green-energy** position.

## What We Need To Buy Now

### 1. One VPS server

- Provider: **Hetzner**
- Purpose: host the MVP application and database on the same server
- MVP setup on this server:
  - application
  - database
  - deployment management

### 2. One domain name

- Purpose: give the product a real public web address
- This is required for normal public access

### 3. Backup storage

- Provider planned: **Backblaze**
- Purpose: store automated database backups outside the VPS

## What We Do Not Need To Buy Separately

### TLS / HTTPS certificate

- We do **not** need to buy a paid TLS certificate
- We will use a **free certificate** setup
- Certificate setup and renewal will be automated through our deployment layer

## MVP Architecture

- **One Hetzner VPS**
- Application and database on the **same server**
- This is the chosen MVP setup because it keeps cost and setup complexity lower

## Later Production Direction

- Later, the **database will move to its own server**
- That change is for cleaner scaling and operations later
- It is **not** part of the MVP purchase decision now

## Short Summary

For the MVP, we need:

- **1 Hetzner VPS**
- **1 domain**
- **1 backup storage account** (Backblaze)

We do **not** need to buy a separate paid TLS certificate.

## TODO

- Auth bug: if a user logs in and then logs out, the `/form` page is no longer reliably protected. Re-check logout flow, client-side route cache/history behavior, and auth enforcement before deployment.
