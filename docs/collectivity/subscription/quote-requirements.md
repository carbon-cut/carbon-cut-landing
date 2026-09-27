# Devis requirements for collectivity subscriptions

## Purpose and scope

This document records what is required to create a customer-facing **devis**
(subscription quote). It is a France-oriented compliance checklist, not legal
or tax advice. Before go-live, confirm the seller's jurisdiction, VAT
treatment, and public-sector procurement obligations with the company
accountant or counsel.

France does not impose one universal set of devis fields for every sale. The
mandatory content depends on the service and buyer context. The checklist
below is the conservative product baseline for a subscription offered to a
legal entity; it is not a claim that every item is independently mandatory in
every French B2B or public-procurement case.

## Information supplied by the buyer

The purchaser-information schema captures the product's customer-side data in
`src/app/[locale]/collectivity/pricing/_lib/infoSchema.ts`:

- legal entity name;
- billing address: address lines, postal code, city, country;
- French SIREN or SIRET when the buyer country is France;
- VAT number when applicable;
- named billing/contact person, email, and optional telephone number;
- requested contract start date.

The requested start date is not the final entitlement date. The administrator
sets the actual subscription activation date after review and payment.

Do **not** ask the buyer to provide quote validity or payment terms. Those are
seller-controlled commercial policies.

An internal purchase-order or commitment reference is not required at quote
configuration time. It may be collected later, after the buyer has approved
the devis internally and before payment or invoicing. For a French public
contract, the final invoice may need the buyer's SIRET, service code, and
engagement number for Chorus Pro routing; those references are normally on the
purchase order.

## Information owned by the seller

The following must be held in protected server-side billing configuration, not
in a customer form:

- legal business name, legal form, registered address, and contact details;
- registration identifier and VAT number or the applicable VAT-exemption
  wording;
- default currency;
- tax policy by transaction: VAT rate, exemption, and calculation rules;
- quote validity policy and payment terms;
- payment instructions, where manual payment is offered;
- CGV / acceptance terms and their version.

## Quote document content: product baseline

Include the following in every subscription devis:

- issue date;
- seller and buyer identities;
- subscription selection: perimeter, modules, commune quantity, term, and
  requested service-start date;
- a detailed line for each selected module: description, quantity, unit price
  HT, line total HT, and applicable discount;
- annual subtotal HT, discount amount, VAT rate and amount, and total TTC;
- currency;
- the date or period in which the service is to be performed;
- validity deadline for the offer;
- payment terms and payment instructions, when applicable;
- acceptance instructions and a CGV reference/version when provided.

The French Ministry of Economy lists the date, seller name/address, client
name, detailed services by quantity and unit price, and total HT/TTC as a
minimum baseline for devis in the situations it covers. For clarity and tax
safety, Carbon Cut should also state the VAT rate or applicable exemption and
the VAT amount.

## Recommended operational controls

These controls are not presented here as universal French devis-formality
requirements, but they are needed for a reliable commercial process:

- generate a unique quote reference;
- retain the issued document and its commercial inputs as an immutable
  snapshot;
- record the catalogue and discount-policy versions used for the quote;
- record the acceptance event and the accepted document version;
- use the seller's approved payment and tax policy rather than accepting these
  values from the buyer.

For professional buyers, CGV are strongly recommended and must be provided if
the professional customer requests them. They should not be confused with the
product's CGU.

## Invoice boundary

A devis is an offer before purchase. A facture is the accounting record for a
finalized sale and has separate legal and accounting requirements.

If Carbon Cut supplies a French public entity under a public contract, the
invoice—not the devis—must follow the public-sector electronic invoicing path
(Chorus Pro). This is a later billing requirement and does not make a
purchase-order reference necessary during quote configuration.

## France reference material

- [French Ministry of Economy: devis requirements](https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/devis-obligatoire-comment-ca-marche)
- [French Ministry of Economy: mandatory invoice information](https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/mentions-obligatoires-dune-facture-tout-savoir)
- [French Ministry of Economy: CGV for professional customers](https://entreprendre.service-public.fr/vosdroits/F33527)
- [French Ministry of Economy: public-sector e-invoicing / Chorus Pro](https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/marches-publics-la-facturation-electronique-comment-ca)
