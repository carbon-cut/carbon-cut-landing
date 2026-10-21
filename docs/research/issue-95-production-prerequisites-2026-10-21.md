# Issue #95: production prerequisite evidence (21 October 2026)

Scope: current primary-source facts for deciding launch requirements. This note does not select a hostname, email service, backup destination, or Hetzner topology.

## What this frontend establishes

- The backend-owned contract includes account registration with a pending-confirmation result, resending confirmation email, emailing a password-reset link, and a contact form whose sender and team inbox must be configured on the server. These are implemented routes in this frontend, but their presence does not establish that production delivery is configured. [Backend contract](../../openapi/backend.yaml), [auth API routes](../../src/app/api/auth), [contact API route](../../src/app/api/contact/route.ts).
- The Collectivity subscription UI creates a link and provides a copy control. It does not show an invitation-email action, so invitation email should not be added to launch requirements without separate evidence. [Invitation link card](../../src/app/%5Blocale%5D/collectivity/subscription/SubscriptionInvitationLinkCard.tsx).
- The contact page displays `support@carboncut.app`, but this code does not establish domain control or a working mailbox. [Support address constant](../../src/lib/contact.ts), [contact page](../../src/app/%5Blocale%5D/contact/page.tsx).

## Public address and TLS

- A public site needs control of a domain and its DNS records. Hetzner DNS accepts domains registered elsewhere and supports A/AAAA/CNAME records for routing, MX for incoming mail, and TXT records used by email authentication or certificate validation. Owning a domain does not require moving its DNS to Hetzner. [Hetzner DNS overview](https://docs.hetzner.com/networking/dns/overview/), [record types](https://docs.hetzner.com/networking/dns/record-types/overview/).
- Hetzner offers domain registration, and its DNS zones are free. Registration price depends on the chosen domain ending and the name's availability; #98 needs a candidate domain or an explicitly provisional price range before it can price this line. [Hetzner domain check and price list](https://www.hetzner.com/whois/), [Hetzner DNS pricing](https://docs.hetzner.com/networking/dns/overview/).
- HTTPS needs a certificate for the chosen hostname and a renewal method. Hetzner-managed Let's Encrypt certificates are for its load balancers and require Hetzner DNS; a server-side reverse proxy may use another ACME setup, whose HTTP-01 or DNS-01 validation requirements depend on the selected method. Thus a load balancer and Hetzner DNS are options, not prerequisites for HTTPS. [Hetzner certificates](https://docs.hetzner.com/networking/certificates/overview/), [Let's Encrypt challenge types](https://letsencrypt.org/docs/challenge-types/).

## Production email

- Define each mail flow first: which events send mail, the visible sender and reply address, and whether replies or support requests must land in an operated inbox. Sending and receiving are separate needs: MX points incoming mail to a receiving server, while the application needs a sending method. [Hetzner DNS record types](https://docs.hetzner.com/networking/dns/record-types/overview/).
- Hetzner Cloud blocks outbound SMTP ports 25 and 465 by default. Port 587 remains available for an external mail delivery service; unblocking 25/465 requires an account-age/payment condition and a case-by-case request. This makes an external authenticated relay a possible path, without selecting one. [Hetzner Cloud server FAQ](https://docs.hetzner.com/cloud/servers/faq/).
- The sending domain needs provider-specific DNS authentication records. Gmail requires at least SPF **or** DKIM for all senders to personal Gmail accounts, and SPF, DKIM, and DMARC for bulk senders; it recommends all three. Record values cannot be finalized until the sending service and domain are chosen. [Gmail sender guidelines](https://support.google.com/mail/answer/81126?hl=en), [Hetzner email authentication explanation](https://docs.hetzner.com/managed/email/email-security/).

## Database durability and recovery

- PostgreSQL point-in-time recovery needs a usable **base backup plus a continuous sequence of archived write-ahead log (WAL) files**. A `pg_dump` is a logical export and cannot be replayed with WAL for PITR. The backup destination need only be recoverable away from a failed database host; S3 is one possible interface, not a PostgreSQL requirement. [PostgreSQL continuous archiving and PITR](https://www.postgresql.org/docs/current/continuous-archiving.html).
- PostgreSQL archives completed WAL segments. On a quiet database, an uncompleted segment can delay off-host protection; `archive_timeout` can bound the switch interval, at a storage cost. The archive process must be monitored because backlog increases possible data loss and can fill the database disk. Consequently, the issue's 15-minute confirmed-save target needs an explicit archiving/verification design and a restore drill, not merely a bucket. [PostgreSQL continuous archiving and PITR](https://www.postgresql.org/docs/current/continuous-archiving.html).
- Hetzner Cloud automatic server backups are daily, retain up to seven copies, and exclude attached Volumes. They can help rebuild a server but do not alone establish 15-minute database recovery or PITR. [Hetzner backups and snapshots](https://docs.hetzner.com/cloud/servers/backups-snapshots/overview/).
- Hetzner Object Storage is S3-compatible and lists automatic backups as a use case. It supports bucket versioning and Object Lock, but Object Lock must be enabled at bucket creation; cross-location bucket replication is not built in. A private bucket, credentials, retention/deletion controls, and restore access therefore remain design choices if this destination is selected. [Hetzner Object Storage overview](https://docs.hetzner.com/storage/object-storage/overview/), [bucket protection FAQ](https://docs.hetzner.com/storage/object-storage/faq/buckets-objects/), [Object Storage general FAQ](https://docs.hetzner.com/storage/object-storage/faq/general/).
- Backup integrity checks are useful but do not replace a test restore. PostgreSQL explicitly recommends restoring and checking the resulting database even when `pg_verifybackup` succeeds. [PostgreSQL `pg_verifybackup`](https://www.postgresql.org/docs/current/app-pgverifybackup.html).

## Network and launch practice

- Hetzner can create servers with only private addresses. Its Cloud Firewalls filter public traffic but do **not** filter traffic on private Cloud Networks, so the chosen topology must specify both public exposure and database access control. A private-only host also lacks direct public-network access, which matters for package updates and off-host backup delivery. [Hetzner server FAQ](https://docs.hetzner.com/cloud/servers/faq/), [Cloud Firewall FAQ](https://docs.hetzner.com/cloud/firewalls/faq/).
- Staging and rollback should be defined as acceptance checks for the selected deployment method: where a release is checked, how application code/configuration can be reverted, how schema changes are handled, and how a restore is exercised. This is a planning inference from the separate recovery and deployment concerns; the cited backup mechanisms do not themselves roll back application releases. [Hetzner backups and snapshots](https://docs.hetzner.com/cloud/servers/backups-snapshots/overview/), [PostgreSQL PITR](https://www.postgresql.org/docs/current/continuous-archiving.html).

## Questions left for #95

1. What domain is controlled, who can change its DNS, and what public hostname should users see?
2. Which production user events send email, from what address, and which address must receive replies/support mail?
3. Which services must have public ingress; what private application-to-backend and backend-to-database paths are required?
4. Where will PostgreSQL base backups and WAL be stored, with what retention, credentials, failure alert, and demonstrated restore time? An S3 bucket is a candidate answer to the destination question, not a complete backup plan.
5. What prelaunch staging check, release rollback, and database migration reversal procedure is feasible for the one-responder operating model?
