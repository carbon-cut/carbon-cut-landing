const cubiqueMeter = "m³" as const;

const waste = {
  amount: "quantity",
  every: "Each",
  amountUnit: { placeholder: "unit", labels: { bag: "bag", kg: "kg" } },
  frequencyUnit: {
    placeholder: "frequency",
    labels: { day: "day", week: "week" },
  },
  bagVolume: { placeholder: "bag volume" },
};

export default {
  units: {
    capita: "inhabitant",
  },
  toast: {
    success: "Success",
    error: "Error",
  },
  components: {
    forms: {
      calendar: "Choose a date",
      combox: {
        placeholder: "Search...",
        notFound: "No entries found.",
        value: "Select",
        loading: "Loading...",
      },
      overview: {
        title: "Form overview",
        description: "View all sections and questions in this carbon footprint assessment",
        nextErrorButton: "Next mistake",
      },
    },
    layout: {
      scrollToTop: {
        label: "Return to top of page",
        ariaLabel: "Return to top of page",
      },
    },
  },
  seo: {
    site: {
      title: "Carbon Cut | Personal carbon dashboard",
      description: "SaaS dashboard for users to track and reduce their personal carbon footprint",
      keywords: [
        "carbon footprint",
        "climate dashboard",
        "CO2 calculator",
        "monitoring of emissions",
        "carbon reduction",
        "personal carbon footprint",
        "Climate SaaS",
        "emissions analysis",
        "sustainable optimization",
        "digital ecological transition",
      ],
    },
    pages: {
      home: {
        title: "Carbon Cut | Measure and reduce your carbon footprint",
        description:
          "Learn how Carbon Cut helps individuals and teams easily measure, track and reduce their carbon footprint.",
        keywords: [
          "carbon footprint application",
          "environmental dashboard",
          "reduction of emissions",
          "home CO2 measurement",
          "climate awareness",
          "sustainable monitoring",
          "low carbon solutions",
          "ecological SaaS tool",
        ],
      },
      form: {
        title: "Carbon Footprint Questionnaire | Carbon Cut",
        description:
          "Complete the guided form to calculate your transport, energy, food, waste and travel emissions.",
        keywords: [
          "carbon footprint form",
          "CO2 questionnaire",
          "transport emissions calculator",
          "personal energy balance",
          "climate data collection",
          "carbon self-assessment",
          "sustainable questionnaire",
        ],
      },
      results: {
        title: "Carbon results and recommendations | Carbon Cut",
        description:
          "View the breakdown of your carbon footprint and receive personalized recommendations to reduce your emissions.",
        keywords: [
          "carbon footprint results",
          "CO2 recommendations",
          "personalized climate analysis",
          "dashboard carbon results",
          "monitoring ecological progress",
          "carbon action plan",
        ],
      },
      contact: {
        title: "Contact | Carbon Cut",
        description:
          "Contact the Carbon Cut team with a question about the account, form, or results during the testing phase.",
        keywords: [
          "contact carbon cut",
          "contact carbon footprint",
          "carbon form help",
          "carbon cut account problem",
          "carbon cut team",
        ],
      },
      help: {
        title: "Help Center | Carbon Cut",
        description:
          "Quickly find answers on the Carbon Cut questionnaire, results, account and contact page.",
        keywords: [
          "carbon cut help center",
          "carbon footprint faq",
          "carbon questionnaire help",
          "questions carbon results",
          "carbon cut user contact",
        ],
      },
      collectivityLanding: {
        title: "Municipality | Carbon inventory prototype | Carbon Cut",
        description:
          "Discover the Carbon Cut prototype to configure a municipality's territory and prepare a municipal carbon inventory.",
        keywords: [
          "municipality carbon inventory prototype",
          "municipal carbon inventory",
          "territory configuration",
          "climate data collection",
          "municipal carbon footprint",
          "municipal climate tool",
        ],
      },
      collectivityPricing: {
        title: "Municipality subscription | Carbon Cut",
        description:
          "Configure the scope, duration and modules of your municipality's subscription.",
      },
      collectivityDashboard: {
        title: "Municipal Inventory (Draft) | Carbon Cut",
        description:
          "UI prototype for collecting city data to build a baseline inventory. This is a draft experience.",
        keywords: [
          "municipal inventory",
          "city baseline",
          "public lighting",
          "fleet inventory",
          "buildings energy data",
          "territorial data collection",
        ],
      },
    },
  },
  collectivityLanding: {
    nav: {
      prototype: "Prototype",
      setup: "Setup",
    },
    hero: {
      badge: "Municipal prototype",
      title: {
        text: "Build a {inventory} you can understand, explain and improve over time.",
        highlight: "municipal GHG inventory",
      },
      description:
        "Carbon Cut helps municipalities turn energy, transport, agriculture, wastewater and other local activity data into a structured emissions inventory — with every result traceable to its data, parameters and sources.",
      imageAlt: "Landscape illustrating the Carbon Cut municipality entrance",
      primaryCta: {
        label: "View pricing",
        aria: "View pricing options",
      },
      secondaryCta: {
        label: "Request prototype access",
        aria: "Request access to the municipality prototype",
      },
    },
    proof: {
      badge: "What this version covers",
      title: "A simple entry point before the workspace.",
      description:
        "This page remains deliberately minimal: it presents the prototype, clarifies its current scope and leads to the configuration, without promising a complete municipal platform.",
      points: {
        territory: {
          title: "Define the perimeter",
          description:
            "Setup begins with territory, inventory years, and basic information needed before entry.",
        },
        inventory: {
          title: "Prepare the collection",
          description:
            "The prototype structures the data families to facilitate the rest of the inventory work.",
        },
        review: {
          title: "Stay in proof of concept",
          description:
            "The current version shows a product direction, with a limited scope and still improving.",
        },
      },
    },
    cta: {
      title: "Start by setting up the territory.",
      description:
        "For this first version, the call to action leads to the configuration module for your municipality.",
      primaryCta: {
        label: "Access configuration",
        aria: "Access the municipality configuration",
      },
      imageAlt: "Closing illustration to access the Carbon Cut municipality configuration",
    },
  },
  collectivitySetup: {
    title: "Configure the municipality",
    description:
      "Before opening the full workspace, fill in the project, territory, inventory years and applicable sections.",
    primaryCta: "Continue",
    submitError: "Unable to save project configuration at this time.",
  },
  collectivityStart: {
    title: "Create a project",
    description: "Select the access to use to create your project.",
    createProject: "Create my project",
    assignmentFrom: "Access granted by {name}",
    organization: "{organization}",
    emptyTitle: "No assignment available",
    emptyDescription: "You currently do not have any assignments to create a project.",
    loading: "Loading your assignments…",
    error: "Unable to load your assignments at this time.",
    retry: "Try again",
  },
  collectivitySubscription: {
    eyebrow: "Access management",
    title: "Subscription access",
    description:
      "Manage access to create a municipal project. Approval of a request gives access to the creation of a project.",
    active: "Active subscription",
    period: "From {startDate} to {endDate} · {years} years",
    capacity: {
      title: "Subscription capacity",
      description: "Who can transform this subscription capacity into a municipal project?",
      assignedOfPurchased: "{assigned} on {purchased}",
      availabilitySummary: "assets · {available} available",
      assignedLegend: "{count} assets",
      availableLegend: "{count} available",
      purchasedLegend: "Quantity: {count}",
      progressLabel: "Active access to the subscribed quantity",
      place: "No. {number}",
      assigned: "Access granted",
      assignedSince: "Access granted on {date}",
      projectCreated: "Project created · {date}",
      projectCreatedWithoutDate: "Project created",
      available: "Available",
      unassigned: "Available",
      assignSelf: "Grant me access",
      createProject: "Create my project",
      usesOnePlace: "Uses available access",
      assignApproved: "Choose a member",
      revoke: "Remove access",
      revokeFor: "Remove access from {email}",
      revokeError: "This access cannot be removed at this time. Refresh the page and try again.",
      selfPending: "Your request is pending.",
      refreshError: "Unable to update access at this time.",
      capacityError: "No access is available. Refresh the page and try again.",
      assignError: "Unable to grant you access at this time.",
    },
    invitationLink: {
      create: "Create an invitation link",
      copy: "Copy link",
      expiresAt: "Expires on {date}",
      accepting: "Open requests",
      replace: "Replace link",
      stop: "Stop requests",
      error: "Unable to update invite link at this time.",
    },
    requests: {
      title: "Incoming requests",
      description: "Requests received via reusable request link",
      awaiting: "{count} waiting",
      approvalNotice: "Approving this request authorizes the creation of a municipal project.",
      name: "Name",
      email: "Email",
      requested: "Requested on",
      approve: "Approve",
      deny: "Refuse",
      recentlyDeclined: "Recently refused",
      declined: "Refused",
      error: "Unable to update this request at this time.",
    },
  },
  collectivityInvitation: {
    label: "Invitation",
    request: "Send my request",
    signIn: "Log in to continue",
    createProject: "Create my project",
    openProject: "Open project",
    retry: "Submit a new request",
    home: "Return to home",
    pendingHelp: "No action is required on your part at this time.",
    inviter: "Invitation from {name}",
    contact: "For any questions, contact {name} directly.",
    error: "Unable to update your request at this time.",
    steps: {
      invitation: "Invitation",
      request: "Request",
      approval: "Approval",
      project: "Project",
    },
    details: {
      created: "Invitation created on",
      expires: "Valid until",
      changed: "Updated on",
      requested: "Request sent on",
      approved: "Approved on",
      denied: "Refused on",
      revoked: "Canceled on",
      project: "Project created on",
    },
    states: {
      valid: {
        badge: "Valid invitation",
        title: "Join this subscription",
        description: "{name} invites you to submit a request to join this subscription.",
      },
      pending: {
        badge: "Awaiting approval",
        title: "Your request has been sent",
        description: "Your request is currently being reviewed.",
      },
      approved: {
        badge: "Request approved",
        title: "Your request is approved",
        description: "You can now create your municipal project.",
      },
      consumed: {
        badge: "Project created",
        title: "Your project is created",
        description: "This approval has already been used to create your project.",
      },
      denied: {
        badge: "Request refused",
        title: "Your request has been refused",
        description: "You can send a new request with this invitation if it is still valid.",
      },
      revoked: {
        badge: "Approval canceled",
        title: "Your approval has been canceled",
        description: "You can no longer create a project with this invitation.",
      },
      invalid: {
        badge: "Invalid invitation",
        title: "This invitation link is not valid",
        description:
          "Check that the link is complete or request a new one from the person who invited you.",
      },
      expired: {
        badge: "Invitation expired",
        title: "This invitation has expired",
        description: "This invitation no longer allows you to send a request.",
      },
      replaced: {
        badge: "Invitation replaced",
        title: "This invitation has been replaced",
        description:
          "This link can no longer be used. Ask the person who invited you for the new link.",
      },
      disabled: {
        badge: "Closed requests",
        title: "This invitation is no longer receiving requests",
        description: "This invitation no longer allows you to send a request.",
      },
    },
  },
  collectivityPricing: {
    title: "Configure your subscription",
    description:
      "Create a single subscription according to the number of municipalities, duration, scope and modules desired. The price is updated with each modification.",
    flow: {
      progressLabel: "Quote progress",
      steps: {
        configuration: "Setup",
        quoteInformation: "Quote information",
        quoteVerification: "Checking the quote",
      },
    },
    quoteInformation: {
      back: "Change configuration",
      title: "Quote information",
      description:
        "Complete the customer information and commercial conditions. The pricing configuration is fixed and will not be recalculated.",
      cards: {
        legalIdentity: {
          title: "Legal identity and invoicing",
          description: "This information will appear on the quote and invoice.",
          customerType: "Customer type",
          legalEntity: "Legal entity",
          legalEntityDescription: "Business or community",
          individual: "Individual",
          individualDescription: "Not supported for this B2B service",
          legalName: "Company name",
          addressLine1: "Address",
          addressLine2: "Additional address",
          addressLine2Hint: "Optional",
          addressLine2Placeholder: "Building, floor, service…",
          postalCode: "Postcode",
          city: "City",
          countryCode: "Country",
          countryCodePlaceholder: "Select a country",
          contact: "Contact",
          contactName: "Contact Name",
          contactEmail: "Email",
          contactPhone: "Telephone",
          contactPhoneHint: "Optional",
          taxIdentifiers: "Tax identifiers",
          taxIdentifiersDescription: "The required fields depend on the customer's country.",
          siren: "SIREN",
          siret: "SIRET",
          frenchRegistrationHint: "Required for customers established in France",
          vatNumber: "Intracommunity VAT number",
          generalTaxIdentifier: "Tax identification number",
          vatNumberHint:
            "Recommended in France · mandatory for an EU customer outside France (reverse charge)",
          hasNoVatNumber: "I do not have an intra-community VAT number",
          viesNotChecked: "To be verified via VIES",
          viesChecking: "VIES Verification…",
          viesVerified: "VIES verified",
          viesInvalid: "Invalid VIES number",
          viesUnavailable: "VIES unavailable",
          viesInvalidMessage: "Invalid",
          taxTreatment: {
            title: "Tax treatment (automatically determined)",
            status: "Applicable French VAT · 20%",
            description:
              "Professional customer established in France. The plan is calculated based on the country, customer type and VAT number — it cannot be modified manually.",
            pendingInformationStatus: "Required tax information",
            pendingInformationDescription:
              "Select the customer's country to determine tax treatment.",
            pendingViesStatus: "VIES verification required",
            pendingViesDescription:
              "The tax treatment will be determined after verification of the VAT number.",
            france: "France · VAT FR 20%",
            europeanUnion: "EU outside France · reverse charge, EU VAT number required",
            europeanUnionDescription:
              "Professional customer established in the European Union outside France. VAT is self-liquidated by the customer.",
            outsideEuropeanUnion: "Outside the EU · VAT not applicable (art. 259 CGI)",
            outsideEuropeanUnionDescription:
              "Professional customer established outside the European Union. French VAT is not applicable.",
            current: "Current",
          },
        },
        quoteTerms: {
          title: "Quotation conditions",
          description: "Currency, validity, start of the contract and payment terms.",
          currency: "Currency",
          currencyEur: "EUR — Euro",
          issueDate: "Issue date",
          issueDateHint: "Automatically populated",
          validityDuration: "Validity period",
          validityDurationValue: "{count} days",
          validUntil: "Valid until",
          validUntilHint: "Calculated from the validity period",
          contractStartDate: "Contract start date",
          paymentTerms: "Payment terms",
          paymentTermsValue: "Payment within {count} days of approval",
          paymentMethod: "Payment method",
          bankTransfer: "Bank transfer",
        },
        selectedOffer: {
          title: "Selected offer",
          frozen: "Frozen",
          checklistTitle: "Before continuing",
          checklistIdentity: "Customer identity",
          checklistAddress: "Address and country",
          checklistTax: "Tax ID required",
          checklistDates: "Validity and start dates",
          checklistTerms: "Currency and payment terms",
          continue: "Continue to verification",
          back: "Return to configuration",
          notice: "No quote is issued at this stage.",
        },
      },
    },
    quoteVerification: {
      backToInformation: "Edit quote information",
      title: "Checking the quote",
      description:
        "Check the entire quote before accepting it. No data can be modified on this screen: use the “Modify” links to return to the step concerned.",
      draft: "Draft · not issued",
      draftHint: "Quote number and issue date assigned to the issue",
      edit: "Edit",
      client: {
        title: "Customer",
      },
      offer: {
        title: "Commercial offer",
        edit: "Change configuration",
        communesValue: "{count} communes",
        table: {
          service: "Module/service",
          quantity: "Qty",
          annualUnitPrice: "Annual unit price",
          annualAmount: "Annual amount excluding tax",
        },
        discount: "Volume discount (−{discount}%)",
        annualAfterDiscount: "Annual price after discount",
      },
      terms: {
        validity: "Validity period",
        validityValue: "{count} days from issue date",
      },
      tax: {
        title: "Tax treatment",
        edit: "Edit customer information",
        france: "Applicable French VAT · 20%",
        europeanUnion: "Reverse charge",
        outsideEuropeanUnion: "VAT not applicable – art. 259-1 of the CGI",
        quoteMention: "Mention appearing on the quote",
        franceMention: "“French VAT at the standard rate of 20%”",
        europeanUnionMention: "“Self-liquidation – article 283-2 of the CGI”",
        outsideEuropeanUnionMention: "“VAT not applicable – article 259-1 of the CGI”",
      },
      issuer: {
        title: "Transmitter",
        description: "Seller information from company settings",
        registeredOffice: "Head office",
        rcs: "RCS",
      },
      sidebar: {
        title: "Quote totals",
        frozen: "Frozen",
        totalHt: "Total excluding tax",
        vat: "VAT",
        totalTtc: "Total including tax",
        totalTtcDescription: "Total amount of the contract over {years} years",
      },
      afterAcceptance: {
        title: "After your acceptance",
        acceptance: {
          title: "Acceptance of quote",
          description: "Your acceptance does not trigger any payment.",
        },
        review: {
          title: "Verification by our team",
          description:
            "We verify your organization and the information provided, then approve or deny the request.",
        },
        payment: {
          title: "Payment after approval",
          description:
            "By bank transfer. The due date is calculated from approval according to your payment terms ({count} days).",
        },
      },
      actions: {
        accept: "Accept and submit for approval",
        back: "Return to quote information",
        notice:
          "Acceptance of the quote is subject to verification and approval by our team. No payment is due until this approval.",
      },
    },
    underReviewQuote: {
      back: "Return to subscription",
      title: "Quote {reference}",
      description:
        "Quote accepted and fixed. Its content is no longer editable while our team reviews it.",
      badge: "Waiting for verification",
      acceptedAt: "Accepted on {date}",
      sirenSiret: "SIREN / SIRET",
      taxDescription: "Determined automatically from customer information",
      notice: {
        summary:
          "Your request has been forwarded for verification. No payment is required at this stage.",
        description:
          "Our team verifies your organization and the information provided. You will be notified as soon as the request is approved or denied.",
      },
      progress: {
        title: "Tracking your request",
        accepted: {
          title: "Quote accepted",
          description: "{date}",
        },
        review: {
          title: "Verification by our team",
          description: "In progress",
        },
        payment: {
          title: "Payment by transfer",
          description: "Due date calculated after approval ({count} days end of month)",
        },
      },
      cancel: {
        action: "Cancel my request",
        title: "Cancel this request?",
        description: "Your request can no longer be approved. You can then prepare a new quote.",
        confirm: "Cancel request",
        dismiss: "Keep request",
        error: "Unable to cancel your request at this time.",
      },
      download: "Download the accepted quote (PDF)",
    },
    acceptedQuote: {
      description:
        "Your request has been approved. Payment is now due according to the terms of the quote.",
      badge: "Approved — payment required",
      approvedAt: "Approved on {date}",
      notice: {
        description:
          "Your organization and the information provided have been verified. Payment is due on or before {dueDate}, under the terms of the quote approved on {approvedDate}.",
      },
      paymentInstructions: {
        title: "Bank transfer instructions",
        beneficiary: "Beneficiary",
        bank: "Bank",
        iban: "IBAN",
        bic: "BIC",
        amount: "Amount to pay",
        reference: "Reference to indicate",
        dueDate: "Payment deadline",
        copy: "Copy",
        referenceNotice:
          "It is essential to indicate the reference of the quote in the wording of the transfer.",
      },
      progress: {
        reviewDescription: "Approved on {date}",
        paymentDescription: "Deadline: {date}",
        paymentStatus: "To be paid",
      },
      amountDue: {
        label: "Amount due",
        dueDate: "before {date}",
      },
      paymentNotice:
        "Payment is made exclusively by bank transfer. The deadline is calculated from the approval date according to the payment conditions of the quote.",
    },
    paidQuote: {
      description: "Your payment has been confirmed. Your subscription is now active.",
      badge: "Payment confirmed",
      paidAt: "Payment confirmed on {date}",
      notice: {
        description:
          "Your payment has been confirmed. You can now access the services included in your subscription.",
        footer:
          "Your subscription is active. Find your projects and services included in your municipality's space.",
      },
      progress: {
        paymentDescription: "Payment confirmed on {date}",
      },
      activePeriod: {
        label: "Active subscription",
        value: "From {startDate} to {endDate}",
        description: "Subscription period",
      },
      manageSubscription: "Manage subscription",
    },
    rejectedQuote: {
      description: "Your request has not been approved. No payment is required.",
      badge: "Request refused",
      rejectedAt: "Refused on {date}",
      notice: {
        description:
          "Our team was unable to approve your request. See the pattern below or contact us for assistance.",
        footer: "No payment is due. You can contact our team or prepare a new quote.",
      },
      reason: {
        title: "Reason for refusal",
        label: "Information communicated",
        unavailable: "The reason for the refusal is not available at this time.",
      },
      progress: {
        reviewStatus: "Refused",
      },
      contactTeam: "Contact our team",
      newQuote: "Create a new quote",
    },
    expiredQuote: {
      description: "Your subscription has expired. Access to services is no longer available.",
      badge: "Subscription expired",
      expiredAt: "Expired on {date}",
      notice: {
        description:
          "Your subscription period has ended. Access to included services is no longer available.",
        footer: "Your subscription has expired. Contact our team or prepare a new quote.",
      },
      activePeriod: {
        label: "Subscription expired",
        description: "Subscription period ended",
      },
      progress: {
        paymentDescription: "Payment confirmed before expiration on {date}",
      },
      contactTeam: "Contact our team",
      newQuote: "Create a new quote",
    },
    catalogueLoading: "Loading the subscription catalog…",
    catalogueLoadError: "Unable to load subscription catalog.",
    quoteContextLoadError: "Unable to prepare quote conditions.",
    pricePreviewLoadError: "Unable to calculate the price of your configuration.",
    configuration: {
      title: "Your configuration",
      panelTitle: "Contract parameters",
      panelDescription: "Define the general framework of your subscription.",
      communes: {
        label: "Number of municipalities",
        description: "From 1 to 10 municipalities",
        valueOne: "{count} commune",
        valueOther: "{count} communes",
        aria: "Number of municipalities covered",
        decrease: "Reduce the number of municipalities",
        increase: "Increase the number of municipalities",
        tiers: {
          one: "1 municipality · 0%",
          twoToThree: "2–3 municipalities · −20%",
          fourToFive: "4–5 municipalities · −30%",
          sixToTen: "6–10 municipalities · −40%",
        },
        tierSingle: "{minimum} municipality · −{discount} %",
        tierRange: "{minimum}–{maximum} municipalities · −{discount} %",
      },
      coverageDiscount: "Cover reduction: −{discount}%",
      term: {
        label: "Contract duration",
        description: "Annual or multi-year commitment",
        oneYear: "1 year",
        threeYears: "3 years",
      },
      termDiscount: "Commitment reduction: −{discount}%",
      perimeter: {
        label: "Perimeter",
        description: "Scope of emissions covered by the inventory",
        municipal_assets: "Municipal assets",
        municipal_assets_description: "Municipal buildings, fleet and equipment",
        whole_territory: "Complete territory",
        whole_territory_description: "All of the territory's emissions",
      },
      combinedDiscount: "Total discount applied: −{discount}%",
    },
    modules: {
      title: "Modules and services",
      description:
        "Select the modules included in your subscription. Price per municipality and per year.",
      selection: "Selection",
      service: "Module",
      annualPrice: "Price",
      status: "Status",
      available: "Available modules",
      upcoming: "Upcoming Features",
      upcomingDescription: "Presented for informational purposes, not selectable",
      required: "Included",
      items: {
        ghg_inventory_scope_1_2: "GHG inventory — Scope 1+2",
        ghg_inventory_scope_3: "GHG inventory — Scope 3",
        emission_factor_consolidation: "Consolidation and validation of emission factors",
        prospective_and_objectives: "Foresight and objectives",
        ghg_mitigation_investment_plan: "GHG mitigation investment plan",
        mrv_monitoring: "MRV tracking",
        significant_indicators: "Significant indicators",
        scoring_system: "Rating system out of 100",
        commune_aggregation: "Intercommunal aggregation",
      },
      descriptions: {
        ghg_inventory_scope_1_2: "Summary of direct and energy-related emissions",
        ghg_inventory_scope_3: "Indirect emissions from the value chain",
        emission_factor_consolidation: "Reference of verified factors",
        prospective_and_objectives: "Reduction trajectories and targets",
        ghg_mitigation_investment_plan: "Prioritization of actions and budgets",
        mrv_monitoring: "Measurement, reporting and verification",
        significant_indicators: "Key Indicator Dashboard",
        scoring_system: "Synthetic climate performance score",
        commune_aggregation: "Consolidation at the intercommunal level",
      },
    },
    availability: {
      available_at_launch: "Available",
      coming_very_soon: "Coming soon",
      in_development: "In development",
      planned_later: "Planned later",
    },
    totals: {
      aria: "Subscription price summary",
      annual: "Annual total",
      contract: "Total contract over {years} years",
    },
    summary: {
      title: "Summary",
      communes: "Municipalities",
      duration: "Duration",
      perimeter: "Perimeter",
      selectedModules: "Selected modules",
      moduleQuantityPrice: "{count} × {price}",
      annualSubtotal: "Annual subtotal",
      coverageDiscount: "Volume discount (−{discount}%)",
      termDiscount: "Commitment discount (−{discount}%)",
      annualTotal: "Annual price",
      perYear: "/ year",
      contractTotal: "Total contract ({years} years)",
      priceTaxNotice:
        "Price excluding tax. The amount is recalculated each time the configuration is modified.",
      taxSuffix: "excl. VAT",
      hostingCompliance: "Data hosted in the European Union · GDPR compliant",
      hostingEu: "Data hosted in the European Union",
    },
    action: {
      signIn: "Log in to continue",
      signedIn: "Your configuration is ready to continue.",
      continue: "Continue",
      retry: "Try again",
      downloadQuote: "Download the quote",
    },
  },
  householdUnderDevelopment: {
    title: "Household Calculator Is Under Development",
    description:
      "We’re preparing the household experience. For now, this area is temporarily unavailable.",
    primaryButton: {
      label: "Back",
    },
    secondaryButton: {
      label: "Go To Community",
    },
  },
  home: {
    nav: {
      features: "Features",
      trust: "Test version",
      results: "Results",
      faq: "Frequently asked questions",
      toggleLabel: "Toggle main navigation",
    },
    hero: {
      title: {
        line1: "Measure your footprint",
        highlight: "carbon",
        line2: "simply.",
      },
      description:
        "A guided journey to estimate emissions linked to transport and household energy, then discover a clear result and practical recommendations.",
      imageAlt: "Carbon Cut main hero image",
      primaryCta: {
        label: "Start the assessment",
        aria: "Start the guided carbon assessment",
      },
      secondaryCta: {
        label: "See how it works",
        aria: "See how the assessment works",
      },
      quickLinks: {
        ariaLabel: "Quick navigation",
        links: {
          features: "What Carbon Cut does",
          faq: "Frequently asked questions",
        },
      },
    },
    whatItDoes: {
      badge: "What Carbon Cut does",
      title: "A guided tour, focused on the essentials.",
      description:
        "Carbon Cut helps you understand your personal footprint without drowning you in unnecessary categories. The route deliberately remains focused on what matters today: transport, home energy and a readable result.",
      imageAlt:
        "Illustration of the Carbon Cut journey showing the questionnaire, the transport and energy categories, then the result with recommendations",
      items: {
        guided: {
          step: "Step 1",
          title: "Take a guided, jargon-free quiz.",
          description:
            "The course asks simple questions about your habits to start the estimate without a spreadsheet, without a complex method and without heavy preparation.",
        },
        focus: {
          step: "Step 2",
          title: "Focus on transportation and home energy.",
          description:
            "The first phase of the product deliberately remains focused on the areas where the personal impact is most useful to understand from the start.",
        },
        result: {
          step: "Step 3",
          title: "Get a clear result with practical recommendations.",
          description:
            "At the end of the journey, Carbon Cut displays a structured estimate with benchmarks by category and concrete ways to start taking action.",
        },
      },
    },
    trust: {
      badge: "Product under test",
      title: "A first clear, deliberately targeted version.",
      description:
        "Carbon Cut is moving forward in stages: a narrower scope, a simple reading of the personal footprint and a product that is still improving.",
      status: "In testing phase",
      statement:
        "Carbon Cut begins with a guided personal assessment, focused on what is most useful to understand today.",
      points: {
        testing: {
          title: "Product under test",
          description:
            "Carbon Cut is still in the testing phase. The journey, interface and results continue to be refined.",
        },
        scope: {
          title: "Targeted scope",
          description:
            "The first version focuses on transportation and home energy to remain clear, useful and readable.",
        },
        firstStep: {
          title: "A useful first step",
          description:
            "The goal is simple: to help understand your personal footprint without unnecessary complexity or excessive promise.",
        },
      },
    },
    testOffer: {
      badge: "Test offer",
      title: "What you are testing now",
      description:
        "A guided, simple and free course with a clear personal result at the end of the course.",
      note: "Version under test: scope voluntarily limited today, extension planned subsequently.",
      chips: ["15–25 mins", "Free access", "Transport + Energy", "Clear result"],
    },
    features: {
      badge: "Features",
      title: {
        line1: "Calculate your impact, reduce your",
        line2: {
          prefix: "footprint and",
          highlight: "preserve the planet",
          suffix: "",
        },
      },
      description:
        "An intuitive SaaS dashboard to collect your data, visualize your emissions by position and accelerate your low-carbon transition.",
      cards: [
        {
          title: "Carbon footprint calculator",
          description: "Reliable estimate based on your habits.",
          alt: "Calculator icon representing carbon footprint calculator",
        },
        {
          title: "Personalized advice",
          description: "Practical tips for reducing your emissions.",
          alt: "Speech bubble icon symbolizing personalized advice",
        },
        {
          title: "Carbon dashboard",
          description: "Clear visualization with graphs and reports.",
          alt: "Dashboard icon depicting carbon visualization",
        },
        {
          title: "Emissions comparator",
          description: "Compare your footprint to local and global averages.",
          alt: "Scale icon representing the emissions comparator",
        },
        {
          title: "Carbon reduction plan",
          description: "Concrete steps to adopt a sustainable lifestyle.",
          alt: "Planning icon symbolizing a carbon reduction plan",
        },
        {
          title: "Analytics for businesses",
          description: "Tool to assess and reduce company emissions.",
          alt: "Analytical icon representing carbon analysis for businesses",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      title: "They adopt Carbon Cut",
      description: "Users who measure, understand and act to reduce their carbon footprint.",
      controls: {
        prev: "Previous testimony",
        next: "Next testimony",
      },
      cards: [
        {
          quote:
            "I used this site to calculate my carbon footprint and was impressed by the simplicity and accuracy of the results.",
          detail:
            "The recommendations for reducing my impact are clear and useful. An essential tool for everyone who wants to contribute to the preservation of the planet.",
          name: "Sarah Johnson",
          role: "Marketing Manager",
        },
        {
          quote:
            "A smooth experience, clear explanations and follow-up that motivates you to progress.",
          detail:
            "The personalized advice helped me reduce my transport emissions in just a few weeks.",
          name: "Hugo Martin",
          role: "Project manager",
        },
        {
          quote: "Finally a tool that transforms carbon calculations into concrete actions.",
          detail:
            "The visualizations are clear and the guided journey makes it easy for my team to engage.",
          name: "Clara Dupont",
          role: "CSR Manager",
        },
      ],
    },
    pricing: {
      badge: "Plans & Features",
      title: "Transparent pricing for each step",
      description:
        "Choose the plan adapted to your carbon maturity and unlock advanced features: export of reports, targeted recommendations and expert support.",
    },
    cta: {
      title: "Start with an initial guided assessment.",
      description:
        "Carbon Cut offers you a simple first step to estimate your personal footprint and understand what matters today in transport and household energy.",
      primaryCta: {
        label: "Start the assessment",
        aria: "Start the guided carbon assessment",
      },
      imageAlt: "Closing illustration to invite you to start the Carbon Cut assessment",
    },
    faq: {
      badge: "Frequently asked questions",
      title: "FAQ",
      items: [
        {
          title: "How does the carbon footprint calculation work on this site?",
          content:
            "The calculation of your carbon footprint is based on your responses to a simple form which covers several aspects of your daily life: your modes of transport, your energy consumption, your eating habits, your waste management and your travels, in particular your holidays. This information is then analyzed to estimate your CO₂ emissions and provide you with a clear overview of your environmental impact.",
        },
        {
          title: "Can I calculate my company's carbon footprint?",
          content:
            "Yes, our site also offers tools adapted to calculate the carbon footprint of companies. By answering specific questions about energy consumption, business travel, waste management, purchasing and production, you will obtain an estimate of the CO₂ emissions generated by your activities. This will allow you to identify action levers to reduce your environmental impact.",
        },
        {
          title: "Is the tool free?",
          content:
            "Yes, our tool offers a free trial period to allow you to test its features. After the trial period, a subscription of 10 euros per year for the basic plan is required to continue using the tool and access all its features.",
        },
        {
          title: "How can I reduce my carbon footprint?",
          content:
            "Our solution provides you with personalized recommendations based on your responses, to help you reduce your carbon footprint. Additionally, we offer CO₂ emissions offsetting options, allowing you to offset your environmental impact by supporting sustainable and eco-friendly projects.",
        },
        {
          title: "Is my data secure?",
          content:
            "Yes, the security of your data is a priority for us. We use advanced security protocols to protect your personal information and ensure its confidentiality. Your data is stored securely and is only used for the estimation of your carbon footprint and the resulting recommendations.",
        },
      ],
    },
    footer: {
      brand: {
        name: "Carbon Cut",
        description: "Personal carbon dashboard to track, understand and reduce your emissions.",
      },
      headings: {
        quickLinks: "Quick links",
        contact: "Contact & help",
        social: "Networks",
        legal: "Legal notices",
        newsletter: "Newsletter",
      },
      contact: {
        email: "Contact us",
        helpCenter: "Help Center",
        demo: "Start the assessment",
      },
      social: {
        linkedin: "LinkedIn",
        twitter: "X / Twitter",
        facebook: "Facebook",
        instagram: "Instagram",
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        cookies: "Cookie policy",
      },
      newsletter: {
        description:
          "Receive low-carbon advice and new product developments (1 to 2 emails per month).",
        placeholder: "Your email",
        cta: "Subscribe",
        privacy: "No spam. One-click unsubscribe.",
      },
    },
  },
  root: {
    header: {
      menu: {
        Home: { title: "Home" },
        About: { title: "About" },
        Blog: {
          title: "Blog",
          Categories: "Categories",
        },
        dashboard: { title: "My carbon footprint" },
        Pages: {
          title: "Pages",
          Contact: "Contact",
          Subscription: "Subscription",
          Page404: "Page 404",
        },
      },
      userMenu: {
        settings: "Settings",
        feedback: "Feedback",
        logout: "Sign out",
      },
    },
  },
  "(pages)": {
    "404": {
      title: "Page not found",
      meta: "Page Not Found",
      description:
        "The page you are looking for may have been deleted,\nrenamed or is temporarily unavailable.",
      button: "Back to home",
    },
    help: {
      badge: "Help Center",
      title: "How can we help you today?",
      description: "Browse the most viewed categories, then open a detailed response in seconds.",
      searchLabel: "Search the help center",
      searchPlaceholder: "Search the help center...",
      actions: {
        start: "Start the assessment",
        contact: "Contact us",
      },
      categoriesTitle: "Select a category",
      categories: [
        { title: "Getting started", meta: "4 items" },
        { title: "Results", meta: "5 items" },
        { title: "Questionnaire", meta: "6 items" },
        { title: "Email delivery", meta: "3 items" },
        { title: "Contact", meta: "4 items" },
        { title: "Privacy", meta: "3 items" },
        { title: "Account", meta: "2 items" },
      ],
      questionsTitle: "Popular questions",
      questions: [
        "How does the step-by-step assessment work?",
        "What do the scores mean on the results page?",
        "Can I take a questionnaire again later?",
        "How do I correct a response that has already been sent?",
        "Why am I not receiving the expected email?",
        "How to contact us with the right information?",
      ],
      featuredArticle: {
        title: "How does the Carbon Cut assessment work?",
        intro:
          "The journey is designed to keep it simple: you answer targeted questions, then you get a clear result with actionable recommendations.",
        steps: [
          "Start the form and complete the transportation and household energy sections.",
          "Check the preview before validation to correct any errors.",
          "View your estimate and recommendations associated with each category.",
          "Come back later to re-evaluate after your first changes.",
        ],
        noteTitle: "Note",
        note: "During the testing phase, certain sections remain deliberately limited to keep the course quick and readable.",
        helpful: "Did this article help you?",
        answers: {
          yes: "Yes",
          no: "No",
        },
      },
    },
    helpCurrent: {
      badge: "Help Center",
      status: "Test version - personal journey support",
      title: "Practical help to move forward without blocking",
      description:
        "Quickly find answers related to the questionnaire, results and account access during the testing phase.",
      searchLabel: "Search help",
      searchPlaceholder: "Search for a topic in help...",
      topicsLabel: "Most viewed topics:",
      topicHints: ["Questionnaire", "Results", "Account", "Email", "Contact"],
      categories: {
        title: "Select a category",
        items: [
          {
            title: "Questionnaire",
            description: "Getting started, progressing and correcting answers.",
            href: "/help/form",
          },
          {
            title: "Results",
            description: "Understand the CO2 estimate and recommendations.",
            href: "/help/results",
          },
          {
            title: "Account",
            description: "Login, access and account issues.",
            href: "/help/account",
          },
        ],
      },
      scope: {
        title: "Current scope",
        description:
          "This block covers the real scope of the product in the test phase, as it is documented today.",
        available: {
          title: "Available now",
          items: [
            "Guided journey to estimate your personal carbon footprint.",
            "Collection of transport and household energy data.",
            "Display of a main result in tonnes of CO2 and a results interface by category.",
          ],
        },
        unavailable: {
          title: "Not currently available",
          items: [
            "Restaurant specific operational workflow.",
            "Specific municipality workflow.",
            "Continuous monitoring of emissions over time.",
            "Audit-ready/compliance reporting and report export.",
            "Carbon compensation/offsetting verified.",
          ],
        },
      },
      faq: {
        title: "Frequently asked questions",
        items: [
          {
            question: "Is the calculation an estimate or an exact measurement?",
            answer:
              "The carbon calculation can never be exact: it is always an estimate. In Carbon Cut, we aim to provide the most accurate estimate possible.",
          },
          {
            question: "Where do the factors used in the CO2 calculation come from?",
            answer: "We use a variety of sources to provide the most accurate results possible.",
          },
          {
            question: "Are the results comparable from one person to another?",
            answer:
              "Comparison between profiles is a future direction, but it is not the main objective of the current course.",
          },
          {
            question:
              "Does Carbon Cut also assess the indirect impact (purchases, services, etc.)?",
            answer: "This broader coverage is planned for the future.",
          },
          {
            question: "Are the recommendations personalized or generic?",
            answer:
              "Today, they remain limited. The objective is to move towards personalized recommendations.",
          },
          {
            question: "Are the results intended for official use (audit, compliance)?",
            answer: "No, not at the moment.",
          },
          {
            question: "How often to repeat the assessment?",
            answer: "Once a year is a good base.",
          },
          {
            question: "How to interpret a “good” or “bad” result?",
            answer:
              "The displayed result and its context in the interface serve as the main reference point.",
          },
        ],
      },
      contactBridge: {
        text: "Need additional help?",
        linkText: "Visit the Contact page.",
      },
    },
    collectivityDashboard: {
      header: {
        badge: "Municipality space",
        status: "Draft · Interface prototype (without backend)",
        title: "Municipal climate plan",
        meta: "Territory to be defined · Framing in progress · Horizon to be set",
      },
      actions: {
        switchInventory: "Change plans",
        new: "New plan",
        settings: "Settings",
        save: "Save",
        import: "Import files",
        addManual: "Add manually",
        downloadTemplate: "Download the model",
        clearAll: "Clear all",
        exportJson: "Export to JSON",
        submitData: "Submit data",
      },
      workflow: {
        eyebrow: "Municipality space",
        title: "Plan modules",
        description:
          "The plan follows the progress of the report: configuration, inventory, scenarios and action plan.",
        currentLabel: "Active space",
        sections: {
          setup: {
            title: "Setup",
            description:
              "Define the reference territory, the years and the initial scope of the project.",
            status: "To configure",
          },
          inventory: {
            title: "Inventory",
            description:
              "Manage collection, years covered and inventory results in the same workspace.",
            status: "Active",
          },
          result: {
            title: "Result",
            description:
              "Read the calculated inventory outputs and check the values returned by the backend.",
            status: "Reading",
          },
          scenarios: {
            title: "Scenarios",
            description: "Compare prospective trajectories and construct BaU/BaC hypotheses.",
            status: "To structure",
          },
          actions: {
            title: "Action plan",
            description:
              "Manage the portfolio of action sheets, with costs, calendar and monitoring in this same module.",
            status: "To structure",
          },
        },
      },
      resultPoc: {
        title: "Prototype results graphs",
        municipal: "Municipal vehicle fleet",
        territory: "Ground Transportation",
        port: "Navigation",
        airport: "National air transport",
        chart: {
          title: "Emissions by scope",
          description: "Year {year}.",
          ariaLabel: "Circular diagram of emissions by perimeter",
          yearSelectorAriaLabel: "Select a year",
          errorTitle: "Unable to load the emissions graph by scope",
          scopes: {
            scope1: "Scope 1",
            scope2: "Scope 2",
            scope3: "Scope 3",
          },
        },
        sourceChart: {
          title: "Emissions: energy by source",
          description: "Year {year}.",
          ariaLabel: "Pie chart of energy emissions by source",
          yearSelectorAriaLabel: "Select a year",
          errorTitle: "Unable to load energy emissions graph by source",
          sources: {
            transport: "Transportation",
            residential: "Residential",
            industry: "Industry",
            tertiary: "Tertiary",
            agriculture: "Agriculture",
            municipal: "Municipal assets",
          },
        },
        ghgDevelopmentChart: {
          title: "GHG emissions",
          description: "Years of inventory.",
          ariaLabel: "Graph of the evolution of greenhouse gas emissions",
          errorTitle: "Unable to load GHG emissions graph",
          series: {
            energy: "Energy",
            afatEmissions: "AFAT (emissions)",
            waste: "Waste",
            absorptions: "Absorptions",
            totalGrossEmissions: "Total gross emissions",
          },
        },
        municipalAssetsChart: {
          title: "Emissions from municipal assets",
          description: "By use.",
          ariaLabel: "Stacked area graph of emissions from municipal assets",
          errorTitle: "Unable to load municipal assets graph",
          series: {
            publicLighting: "Public lighting",
            fleet: "Vehicle fleet",
            buildings: "Buildings",
          },
        },
        territorialEnergyChart: {
          title: "Details of broadcasts",
          description: "By category, source and sector.",
          ariaLabel: "Graph of territorial energy emissions by source and sector",
          tabListAriaLabel: "Emission Detail Categories",
          energyTab: "Territorial energy",
          errorTitle: "Unable to load territorial energy graph",
          energySources: {
            electricity: "Electricity",
            naturalGas: "Natural gas",
            gpl: "GPL",
            diesel: "Diesel",
            gasoline: "Gasoline",
            gnv: "GNV",
          },
          sectors: {
            industry: "Industry",
            residential: "Residential",
            tertiary: "Tertiary",
            agriculture: "Agriculture",
          },
          transportTab: "Transportation",
          transportAriaLabel: "Graph of transport emissions by owner",
          transportErrorTitle: "Unable to load transport emissions graph",
          afatTab: "AFAT",
          afatAriaLabel: "AFAT graph by breeding, crops and tree absorptions",
          afatErrorTitle: "Unable to load AFAT chart",
          afatSeries: {
            livestock: "Breeding",
            crops: "Crops",
            urbanTrees: "Urban trees",
          },
          municipalTab: "Municipal assets",
          municipalAriaLabel: "Graph of municipal assets emissions by energy",
          municipalErrorTitle: "Unable to load municipal assets graph",
        },
        summaryCards: {
          ariaLabel: "Main results indicators",
          emissions: "Broadcasts",
          netEmissions: "Net emissions",
          absorptions: "Absorptions",
          emissionsPerCapita: "Emissions per capita",
          annualChange: "{change} per year",
          unavailable: "Comparison unavailable",
          noData: "Data unavailable",
          errorTitle: "Unable to load indicator",
        },
      },
      moduleStructure: {
        title: "Major sections",
        sections: {
          setup: [
            {
              title: "Territory",
              description: "Verification of the reference territory used by the plan.",
            },
            {
              title: "Temporality",
              description: "Base year and inventory years included in the configuration.",
            },
          ],
          inventory: [
            {
              title: "Data collection",
              description:
                "Activity data sets, imports and entries necessary to build the inventory.",
            },
            {
              title: "Evidence and sources",
              description:
                "Supporting documents, operator exports and documentary sources linked to the datasets.",
            },
            {
              title: "Hypotheses and method",
              description: "Assumptions, proxies, calculation method and data quality limits.",
            },
            {
              title: "Inventory Results",
              description:
                "Calculated emissions, breakdowns, completeness status and restitution of outputs.",
            },
            {
              title: "Reading territory",
              description:
                "Aggregated view of Greater Sfax at the territorial level in the same workspace.",
            },
            {
              title: "Municipal assets reading",
              description: "Municipal cuts targeting the municipal assets of each municipality.",
            },
          ],
          scenarios: [
            {
              title: "BaU",
              description: "Trend scenario based on the continuation of the observed dynamics.",
            },
            {
              title: "BaC",
              description: "Low-carbon transition scenario built from mitigation levers.",
            },
            {
              title: "Sectoral assumptions",
              description: "Sector assumptions used to project activities and emissions.",
            },
            {
              title: "Activity trajectories",
              description:
                "Projected evolution of activity data according to the selected scenarios.",
            },
            {
              title: "Emission trajectories",
              description: "Comparison of projected emissions between BaU and BaC by 2030.",
            },
            {
              title: "Target 2030",
              description: "Climate target and reduction potential identified by the scenarios.",
            },
          ],
          actions: [
            {
              title: "Context and justification",
              description:
                "Why the action exists, what diagnosis it is based on and what needs it covers.",
            },
            {
              title: "Objectives",
              description: "Expected result, course pursued and contribution to the climate plan.",
            },
            {
              title: "Description of the action",
              description: "Operational content of the action sheet and scope of implementation.",
            },
            {
              title: "Actors",
              description: "Managers, partners and parties involved in the implementation.",
            },
            {
              title: "Impacts",
              description:
                "Expected effects, particularly on emissions and territorial deployment.",
            },
            {
              title: "Investment, schedule and monitoring",
              description:
                "Costs, phasing, deadlines and management integrated into this same module.",
            },
          ],
        },
      },
      setupWorkspace: {
        eyebrow: "Active module",
        title: "Project setup",
        description:
          "Define the reference territory and years of work before opening the inventory.",
        primaryCta: "Save configuration",
        sections: {
          scope: {
            title: "Identification",
            description:
              "Fill in the project name, choose the country and territory concerned, then check the slug used in the project URL.",
            nameLabel: "Project Name",
            namePlaceholder: "e.g. Greater Sfax carbon inventory",
            nameHelper:
              "This name is used to clearly identify the project in the workspace and in backend returns.",
            countryLabel: "Country",
            countryPlaceholder: "Choose a country",
            countryHelper:
              "The country conditions the benchmarks and work data attached to the plan.",
            slugLabel: "Project slug",
            slugPlaceholder: "e.g. inventory-grand-sfax",
            slugHelper:
              "The slug is proposed based on the project name. It remains modifiable, but it must be unique.",
          },
          territory: {
            title: "Territory",
            description:
              "Enter the city, intermunicipality or main territory of the project before opening the inventory.",
            label: "City or territory",
            placeholder: "e.g. Greater Sfax",
            disabledPlaceholder: "Enter a territory",
            helper: "Enter the territory as it should appear in the project and in future exports.",
          },
          temporality: {
            title: "Temporality",
            description:
              "Set the reference year then add the other years covered by the inventory.",
            referenceYearLabel: "Reference year",
            referenceYearPlaceholder: "Choose a year",
            referenceYearHelper: "This year serves as an anchor point for reading the inventory.",
            inventoryYearsLabel: "Years of inventory",
            inventoryYearsPlaceholder: "Add a year of inventory",
            inventoryYearsDisabledPlaceholder: "First choose the reference year",
            addYear: "Add",
            removeYear: "Remove",
            referenceYearBadge: "Reference",
            emptyState: "No inventory year has been added yet.",
            helper: "The reference year is added automatically. Then add the other years to cover.",
          },
          applicability: {
            title: "Applicable scope",
            description:
              "Specify the optional sections to open in the inventory upon creation of the project.",
            legend: "Sections to include in the initial scope",
            helper:
              "These choices are used to decide which entry sections should exist in the current inventory.",
            footer:
              "You can only check the sections that actually exist within the municipality's scope.",
            options: {
              airport: {
                label: "Airport",
                helper:
                  "Activates the section related to air transport within the collected scope.",
              },
              port: {
                label: "Port",
                helper:
                  "Activates the section related to port activities in the collected perimeter.",
              },
              agriculture: {
                label: "Agriculture",
                helper:
                  "Activates AFAT sections related to production and agricultural activities.",
              },
            },
          },
        },
        destructiveWarnings: {
          title:
            "This modification will delete recorded data and require an update of the inventory.",
          items: {
            removeYear: "Year {year} will be removed from the saved state.",
            disableAirport: "Disabling the airport will delete saved data related to air travel.",
            disablePort: "Disabling the port will delete recorded data related to port activities.",
            disableAgriculture:
              "Disabling agriculture will delete saved data related to agricultural sections.",
          },
        },
      },
      projectSelector: {
        eyebrow: "Municipality space",
        title: "Choose a project",
        openAction: "Open project",
        createAction: "Create a project",
      },
      accessNotice: {
        eyebrow: "Municipality space",
        authTitle: "Municipality session unavailable",
        authDescription: "The page was unable to load project data with your current session.",
        unavailableTitle: "Municipality data unavailable",
        unavailableDescription: "Failed to load the project before opening the workspace.",
        alertTitle: "Interrupted access",
        authAlertDescription: "Server authentication is not available for this page at this time.",
        unavailableAlertDescription: "The server is unavailable or returned an error.",
        returnAction: "Return to the municipality area",
      },
      planSidebar: {
        title: "Reading the report",
        description:
          "Four modules visible at startup: configuration, inventory, scenarios and action plan. Entry routes remain non-modular.",
        projects: "My projects",
      },
      planMarkers: {
        territory: "Reference territory",
        referenceYear: "Reference year",
        supportYears: "Years of inventory",
      },
      baseline: {
        eyebrow: "Reference series",
        title: "Projection base",
        description:
          "An IRE and at least another year are required to launch the scenarios, build comparisons and feed the plan.",
        requirementsTitle: "Common prerequisites",
        requirements: [
          "1 IRE validated for the reference year.",
          "1 other minimum year to compare and project.",
          "Consistent municipal and territorial data before scripting.",
        ],
      },
      inventory: {
        eyebrow: "Active module",
        title: "Inventory",
        description:
          "The inventory remains the basis of work. The subsections below are used to structure the input, evidence and hypotheses before the scenarios.",
        navLabel: "Inventory subsections",
      },
      inventoryWorkspace: {
        eyebrow: "Active module",
        title: "Inventory collection",
        description:
          "Opening the route must lead directly to a dataset to be filled in, with the useful fields visible without an invasive navigation structure.",
        saveSuccess: "The draft inventory has been saved.",
        saveError: "Unable to save draft inventory at this time.",
        submitError: "Unable to submit inventory at this time.",
        submitValidationError: "Some data is not ready for calculation.",
        validationError: "Correct any errors in the form before saving.",
        controls: {
          domainsLabel: "Inventory areas",
          datasetLabel: "Datasets",
          submitLabel: "Submit data",
          datasetPlaceholder: "Choose a dataset",
          yearLabel: "Year viewed",
          yearPlaceholder: "Choose an inventory year",
          lensLabel: "Active reading",
          lensPlaceholder: "Choose a reading",
          lenses: {
            territorial: "Territorial",
            municipal: "Municipal assets",
          },
        },
        debugCalculation: {
          action: "Debug calculation",
          label: "Temporary debug result",
          success: "Success",
          error: "Unable to run debug calculation for this dataset.",
          errors: {
            RExceedInput: "The methane recovered cannot exceed the methane produced.",
            unknown: "Data does not respect a calculation rule.",
          },
          validationError: "This dataset contains fields that need to be corrected.",
          calculationError: "The server cannot calculate this dataset.",
          requestError: "The calculation request was not successful.",
          total: "Total",
          formulaVersion: "Formula version",
          parameters: "Settings",
          warnings: "Warnings",
        },
        sections: {
          years: {
            title: "Years of inventory",
            description:
              "First choose the year you are working on. The finished input blocks are then based on this year.",
          },
          families: {
            title: "Sources and datasets",
            description:
              "The user advances by collection source then by dataset. The finished games have a real structure; the others remain visible in placeholder under dev.",
            datasetsLabel: "datasets",
          },
          entry: {
            title: "Entering the active game",
            description:
              "The heart of the route is here: working on a dataset, filling in its values, then attaching what is still missing.",
            statusLabel: "Game state",
            sourceModeLabel: "Source-native reading",
            yearModeLabel: "Year-native reading",
            implementationLabel: "Current implementation",
            activeYearLabel: "Active year",
            placeholder: {
              title: "Block under dev",
              description:
                "The input file does not yet determine the exact structure of this game. We therefore keep a deliberately provisional block to preserve the entire collection architecture.",
              noteLabel: "Provisional note",
              noteValue:
                "under dev. structure not yet fixed. placeholder kept only to see the full page during the build.",
            },
            fleet: {
              compositionTitle: "Fleet composition",
              compositionDescription:
                "Report-backed structure from the input document: vehicle categories, engines, then annual block for the active year.",
              category: {
                function: "Company cars",
                service: "Service cars",
                serviceEngines: "Vehicles and service machines",
                other: "Others",
              },
              fuel: {
                petrol: "Gasoline",
                diesel: "Diesel",
                gpl: "GPL",
                electricity: "Electric",
                gnv: "GNV",
              },
              yearlyVehiclesTitle: "Number of vehicles",
              engine: {
                petrol: "Petrol vehicles",
                diesel: "Diesel vehicles",
                gpl: "LPG vehicles",
                electricity: "Electric vehicles",
                hybrid: "Hybrid vehicles",
                gnv: "CNG vehicles",
                total: "Total",
              },
              yearlyEnergyTitle: "Energy consumption",
              yearlyEnergyRequirementTooltip:
                "Enter at least one annual consumption per energy, or one annual expenditure with a corresponding energy price.",
              yearlySpendTitle: "Energy expenditure",
            },
            publicLighting: {
              infrastructureTitle: "Public lighting infrastructure",
              infrastructureDescription:
                "Structure from the input document: network, light points by type, then annual block for the active year.",
              infrastructure: {
                cabinets: "Number of cabinets",
                meters: "Number of counters",
                dimmers: "Number of operational drives",
                power: "Power if applicable",
              },
              lampsTitle: "Light points by type",
              lampsDescription:
                "Each line shows the type of lamp in the report with its unit power and its total.",
              lamps: {
                shp: "SHP",
                hpl: "HPL",
                led: "LED",
              },
              lampColumns: {
                unitPower: "Unit power",
                number: "Total light points",
              },
              yearlyTitle: "Annual public lighting block",
              yearlyRequirementTooltip:
                "Enter either the annual electricity consumption or the annual bill with the corresponding electricity price.",
              yearly: {
                consumption: "Annual electricity consumption",
                bill: "Annual electric bill",
              },
            },
            buildings: {
              areasTitle: "Municipal Buildings",
              areasDescription:
                "Structure from the input document: total buildings, open area and covered area.",
              areas: {
                building: "Buildings",
                openSurface: "Open surface",
                closedSurface: "Covered area",
              },
              consumptionTitle: "Energy flows of buildings",
              consumptionDescription: "Consumption and bills remain organized by energy source.",
              consumptionRequirementTooltip:
                "Enter either the electricity consumption or the electricity bill with the corresponding electricity price.",
              consumption: {
                electricityConsumption: "Power consumption",
                electricityBill: "Electric bill",
                gasConsumption: "Natural gas consumption",
                gasBill: "Natural gas bill",
                dieselConsumption: "Diesel consumption",
                dieselBill: "Diesel bill",
                otherConsumption: "Other consumption",
                otherBill: "Other invoice",
              },
            },
            priceAssumptionsTable: {
              titles: {
                electricity: "Electricity prices",
                energy: "Energy prices",
                fuelsAndElectricity: "Prices of fuel and electricity",
              },
              rows: {
                electricity: "Unit price of electricity",
                naturalGas: "Unit price of natural gas",
                diesel: "Unit price of diesel",
                petrol: "Unit price of gasoline",
                gpl: "LPG unit price",
                gnv: "Unit price of NGV",
              },
            },
            yearMetricsTable: {
              columns: {
                line: "Line",
                sector: "Sector",
                actions: "Actions",
              },
              sectors: {
                residential: "Residential",
                tertiary: "Tertiary",
                industry: "Industry",
                transport: "Transportation",
                agriculture: "Agriculture",
              },
              fixedLabels: {
                households: "Households",
                commerce: "Commerce",
                services: "Services",
                domestic: "Domestic",
                commercial: "Commercial",
                administration: "Administration",
                publicLighting: "Public lighting",
                agriculture: "Agricultural",
                smallIndustry: "Small industries",
                workshops: "Workshops",
                industries: "Industries",
                extractive: "Extractive industry",
                chemical: "Chemical industry",
                textile: "Textile and clothing industry",
                food: "Food industry",
                otherIndustries: "Various industries",
                pumping: "Pumping",
                tourism: "Tourism",
                transportTelco: "Transport and telecom",
                cement: "Cement plant",
                water: "Water pumping",
                industrialZone: "Industrial zone",
                powerPlant: "Central",
                industrialHub: "Industrial center",
              },
              customLabelPlaceholder: "Column name",
              sectorPlaceholder: "Choose a sector",
              addColumn: "Add a column",
              removeColumn: "Delete column",
            },
            electricity: {
              surface: {
                title: "Electricity demand",
                requirementTooltip:
                  "Provide at least one electricity consumption in the industrial sector for each year.",
                readinessTitle: "Missing industrial consumption",
                readinessDescription:
                  "Enter at least one electricity consumption in the industrial sector for the following years: {years}.",
              },
              lt: {
                title: "Low voltage",
                domestic: "Domestic",
                commercial: "Commercial",
                administration: "Administration",
                publicLighting: "Public lighting",
                agriculture: "Agricultural",
                smallIndustry: "Small industries",
                workshops: "Workshops",
                industries: "Industries",
                total: "Total",
              },
              mt: {
                title: "Medium voltage",
                extractive: "Extractive industry",
                chemical: "Chemical industry",
                textile: "Textile and clothing industry",
                food: "Food industry",
                otherIndustries: "Various industries",
                agriculture: "Agriculture",
                pumping: "Pumping",
                tourism: "Tourism",
                transportTelco: "Transport and telecom",
                total: "Total",
              },
              ht: {
                title: "High voltage",
                cement: "Cement plant",
                water: "Water pumping",
                industrialZone: "Industrial zone",
                total: "Total",
              },
              rows: {
                consumption: "Consumption (GWh)",
                subscribers: "Number of subscribers",
              },
            },
            photovoltaic: {
              bt: {
                title: "LV photovoltaic",
                subscribers: "Number of BT subscribers",
                capacity: "Installed power (kWp)",
                production: "Production (MWh)",
                balance: "Annual transaction balance",
              },
              mt: {
                title: "MV photovoltaic",
                subscribers: "Number of MT subscribers",
                capacity: "Installed power (kWp)",
                production: "Production (MWh)",
                balance: "Annual transaction balance",
              },
            },
            naturalGas: {
              surface: {
                title: "Natural gas",
                requirementTooltip:
                  "Provide at least one natural gas consumption for the tertiary sector and at least one for the industrial sector for each year.",
                readinessTitle: "Missing tertiary consumption",
                readinessDescription:
                  "Enter at least one natural gas consumption in the tertiary sector for the following years: {years}.",
              },
              populationTitle: "Population",
              populationRequirementTooltip: "Inform the population.",
              assumptionsTitle: "Household energy hypotheses",
              assumptionsRequirementTooltip:
                "Enter the household energy hypothesis necessary for the calculation.",
              lp: {
                title: "Low pressure",
                households: "Households",
                commerce: "Commerce",
                services: "Services",
                total: "Total",
              },
              mp: {
                title: "Medium pressure",
                industry: "Industry",
                tourism: "Tourism",
                agriculture: "Agriculture",
                total: "Total",
              },
              hp: {
                title: "High pressure",
                note: "High pressure columns can be added, renamed or deleted.",
                powerPlant: "Central",
                industrialHub: "Industrial center",
                total: "Total",
              },
              rows: {
                consumption: "Consumption (Nm3)",
                subscribers: "Number of subscribers",
              },
              population: {
                count: "Population",
              },
              assumptions: {
                consumptionNorm: "Consumption standard",
                consumptionNormHelper:
                  "Reference value representing the average household consumption of gaseous fuels per inhabitant, for residential uses, expressed in toe/capita. It is used to estimate household LPG consumption.",
              },
            },
            solarWaterHeating: {
              residential: {
                title: "Residential",
                number: "Number of households",
                area: "Installed area (m²)",
              },
              tertiary: {
                title: "Tertiary",
                number: "Number of tertiary entities",
                area: "Installed area (m²)",
              },
              industrial: {
                title: "Industrial",
                number: "Number of industrial entities",
                area: "Installed area (m²)",
              },
            },
            port: {
              fuel: {
                diesel: "Diesel",
                splitHelp:
                  "If you only have total diesel consumption not distributed between these two types of trips, leave both fields empty. The result will be reported as not estimated (NE), not zero.",
              },
              roundTripFuelConsumption: {
                title: "Outings with return to port",
              },
              outboundFuelConsumption: {
                title: "Departures to a destination outside the perimeter",
              },
              electricityConsumption: {
                title: "Port electricity consumption",
                rows: {
                  electricityConsumption: "Power consumption",
                  electricityBill: "Electric bill",
                },
              },
            },
            buses: {
              operators: {
                title: "Operators",
                description:
                  "The initial structure keeps the single operator visible as working metadata.",
                column: "Operator",
                default: "Metropolitan bus authority",
                addLabel: "Add an operator",
                rowPrefix: "Operator",
              },
              exploitation: {
                title: "Operation",
                buses: "Number of buses operated",
                fuelConsumption: "Fuel consumption",
                fuelSpend: "Fuel expense",
                kmTravelled: "Km traveled",
                staff: "Number of agents",
                passengerKm: "Passenger-km",
                passengers: "Number of passengers",
              },
              energyConsumption: {
                title: "Consumption by energy",
                diesel: "Diesel",
                petrol: "Gasoline",
                gpl: "GPL",
                gnv: "GNV",
                electricity: "Electricity",
              },
              energyByFuel: {
                title: "Fleet and energy by motorization",
                requirementTooltip:
                  "Enter at least one fuel activity per year for this operator: either consumption or expenditure with the corresponding fuel price.",
                buses: "Number of buses",
                consumption: "Consumption",
                spend: "Expense",
              },
              renewal: {
                title: "Fleet renewal",
                scrapped: "Buses reformed/sold",
                purchased: "Buses purchased",
                purchaseCost: "Purchase cost",
              },
              age: {
                title: "Fleet age",
                age0to5: "0-5 years",
                age6to10: "6-10 years",
                age10plus: "More than 10 years",
              },
              future: {
                title: "Planned acquisitions/renewals",
                column: "Scheduled buses",
                renewalFuture: "Future renewal",
              },
            },
            urbanRail: {
              services: {
                title: "Rail services",
                description: "Add metro, tram, light rail or funicular services.",
                default: "Urban rail service",
                addLabel: "Add a service",
                removeLabel: "Remove service",
                operationsWithinMunicipalBoundary:
                  "I confirm that the energy indicated corresponds only to trips made within the municipal perimeter.",
                operationsWithinMunicipalBoundaryHelp:
                  "If a line crosses the municipal perimeter, enter the energy consumed during trips made within this perimeter.",
                operationsWithinMunicipalBoundaryHelpLabel:
                  "Information on the municipal perimeter",
              },
              energy: {
                title: "Energy used",
                consumption: "Consumption",
                spend: "Expense",
                electricity: "Electricity",
                electricityHelp:
                  "Electricity consumed by rail vehicles. Do not include buildings or fixed installations.",
                electricityHelpLabel: "Information on electricity consumption",
                diesel: "Diesel",
              },
            },
            airTransport: {
              surface: {
                readinessTitle: "Missing national movements",
                readinessDescription:
                  "Enter at least one national movement for the following years: {years}.",
              },
              movements: {
                title: "Aircraft movements",
                requirementTooltip: "Enter at least one national movement for each year.",
                description:
                  "One line per aircraft type, with the international/national distinction in each year.",
                columns: {
                  international: "International",
                  national: "National",
                },
              },
              aircraft: {
                a220: "A220",
                a319: "A319",
                a320: "A320",
                a321: "A321",
                a330: "A330",
                a350: "A350",
                boeing737: "Boeing 737",
                boeing757: "Boeing 757",
                boeing767: "Boeing 767",
                boeing777: "Boeing 777",
                boeing787: "Boeing 787",
                regionalTurboprop: "Regional turboprop",
                regionalJet: "Regional jet",
                other: "Other",
              },
              energy: {
                title: "Airport energy/fuels",
                buildingElectricity: "Electricity consumption of buildings",
                diesel: "Diesel fleet consumption",
                petrol: "Fleet fuel consumption",
                electricFleet: "Electric fleet consumption",
                kerosene: "Kerosene used on planes",
              },
            },
            territoryVehicles: {
              title: "Territorial vehicles",
              requirementTooltip:
                "Inform the entire vehicle fleet in the area with the type, fuel and associated measures.",
              description: "Add vehicle type/fuel combinations active in the territory.",
              addLabel: "Add a line",
              rowLabelPrefix: "Line",
              fields: {
                vehicleType: "Vehicle type",
                vehicleTypePlaceholder: "Choose a type",
                fuel: "Fuel",
                fuelPlaceholder: "Choosing a fuel",
              },
              measures: {
                vehicles: "No. vehicles",
                avgConsumption: "Average consumption",
                avgMileage: "Average mileage / year",
              },
              vehicleTypes: {
                motorcycles: "Motorcycles",
                publicTransportVehicles: "Public transport vehicles",
                mopeds: "Mopeds",
                agriculturalEquipment: "Agricultural equipment",
                privateVehicles: "Private vehicles",
                specializedMachinery: "Specialized machines",
                touristBuses: "Tourist buses",
                heavyTrucks: "Heavy goods vehicles",
                lightTrucks: "Light/utility trucks",
                agriculturalTractors: "Agricultural tractors",
                tricycles: "Tricycles",
                quadricycles: "Quadricycles",
                semiTrailerTractors: "Road tractors",
                microbuses: "Microbus",
                doubleDeckerCoaches: "Double-decker coaches",
                emergencyInterventionVehicles: "Emergency response vehicles",
                taxis: "Taxis",
                sharedTaxis: "Collective taxis",
                touristTaxis: "Tourist taxis",
                motorbikes: "Motorcycles",
                specialVehicles: "Special vehicles",
                mixedCars: "Mixed cars",
              },
              fuels: {
                diesel: "Diesel",
                petrol: "Gasoline",
                gpl: "GPL",
                gnv: "GNV",
                electricity: "Electricity",
                hybrid: "Hybrid",
                other: "Other",
              },
            },
            wastewaterTreatment: {
              discharge: {
                title: "Discharge of treated effluent",
                description: "Indicate the discharge into an aquatic environment, when applicable.",
              },
              nitrogen: {
                title: "Nitrogen and N₂O",
                description: "Enter annual nitrogen when known.",
              },
              surface: {
                title: "Wastewater",
              },
              treatment: {
                title: "Wastewater treatment and discharge",
                description:
                  "Add a treatment or discharge system, then enter the known annual organic loads.",
                addLabel: "Add a system",
                rowLabelPrefix: "System",
                fields: {
                  system: "Processing system",
                  systemPlaceholder: "Choose a system",
                  loadType: "Type of waste water",
                  loadTypePlaceholder: "Choose a type",
                  withinMunicipalBoundary: "Within the municipal perimeter",
                  withinMunicipalBoundaryPlaceholder: "Choose an answer",
                },
                columns: {
                  organicLoad: "Organic load",
                  sludgeRemoved: "Organic load removed in sludge (S)",
                  nitrogen: "Nitrogen from wastewater",
                  methaneRecovery: "Methane recovered",
                  populationAllocation: "Share of domestic BOD treated by this system",
                  effluentPath: "Treated effluent data",
                  outgoingLoad: "Outgoing organic load",
                  effluentTreatmentLevel: "Effluent treatment level",
                  biologicalTreatment: "Biological treatment",
                  receivingWaterCondition: "State of the receiving environment",
                  dischargesToWater:
                    "Is the treated effluent discharged into an aquatic environment?",
                  receivingWater: "Receiving midfielder",
                },
                yesNo: { no: "No", yes: "Yes" },
                withinMunicipalBoundary: { true: "Yes", false: "No" },
                receivingWater: {
                  otherAquatic: "Other aquatic environment",
                  reservoirLakeEstuary: "Reservoir, lake or estuary",
                },
                effluentPaths: {
                  measuredOutgoingLoad: "Outgoing organic load measured",
                  treatmentLevel: "Known processing level",
                },
                effluentTreatmentLevels: {
                  untreated: "No effective treatment",
                  primaryMechanical: "Basic mechanical processing",
                  secondaryBiological: "Normal biological treatment",
                  advancedBiological: "Advanced biological treatment",
                  notEstimated: "Impossible to estimate",
                },
                biologicalTreatments: {
                  standard: "Standard biological treatment",
                  advanced: "Advanced biological treatment",
                },
                receivingWaterConditions: {
                  normalOrUnknown: "Normal or unknown",
                  nutrientImpactedOrHypoxic: "Nutrient-Impacted or Hypoxic",
                },
                loadTypes: {
                  domestic: "Domestic",
                  industrial: "Industrial",
                  unclassified: "Unclassified wastewater",
                },
                help: {
                  organicLoad:
                    "Indicate the known annual load. It is required unless entry by population is used.",
                  organicLoadLabel: "Information on organic load",
                  loadType:
                    "In the calculations, unclassified wastewater is treated as domestic wastewater.",
                  loadTypeLabel: "Information on the type of wastewater",
                  withinMunicipalBoundary:
                    "Indicate whether the treatment system is located within the municipal perimeter.",
                  withinMunicipalBoundaryLabel: "Information on the municipal perimeter",
                  sludgeRemoved:
                    "It's not a mass of sludge. Enter the organic load removed in the sludge for the systems concerned.",
                  sludgeRemovedLabel: "Information on load removed in sludge",
                  nitrogen: "Optional: enter the annual nitrogen only if it is known.",
                  nitrogenLabel: "Nitrogen Information",
                  methaneRecovery: "Optional: leave blank if no methane is recovered.",
                  methaneRecoveryLabel: "Information on recovered methane",
                  populationAllocation:
                    "Optional: unnecessary when the annual domestic organic load is known directly.",
                  populationAllocationLabel: "Information on the share of domestic BOD treated",
                  dischargesToWater:
                    "For systems other than direct discharge. If the answer is yes, then indicate the receiving environment.",
                  dischargesToWaterLabel: "Information on release into water",
                  receivingWater:
                    "To be provided for direct discharge, or when the treated effluent enters an aquatic environment.",
                  receivingWaterLabel: "Information on the receiving environment",
                  effluentPath:
                    "Choose a metered outgoing load if available; otherwise, indicate the processing level.",
                  effluentPathLabel: "Information on the path of the treated effluent",
                  outgoingLoad:
                    "Annual organic load measured after treatment. It replaces the processing level.",
                  outgoingLoadLabel: "Outgoing organic load information",
                  effluentTreatmentLevel:
                    "Choose the known level. “Unable to estimate” keeps the path as unestimated, without replacing it with zero.",
                  effluentTreatmentLevelLabel: "Information on processing level",
                  biologicalTreatment:
                    "To be provided for centralized aerobic treatment when nitrogen is known.",
                  biologicalTreatmentLabel: "Information on biological treatment",
                  receivingWaterCondition:
                    "To be entered when the nitrogen is known and the system discharges into an aquatic environment.",
                  receivingWaterConditionLabel:
                    "Information on the state of the receiving environment",
                },
                systems: {
                  centralizedAerobic: "Centralized aerobic treatment",
                  anaerobicReactor: "Anaerobic reactor",
                  anaerobicShallowFacultativeLagoon: "Facultative shallow anaerobic lagoon",
                  anaerobicDeepLagoon: "Deep anaerobic lagoon",
                  constructedWetlandSurfaceFlow: "Constructed wetland with surface flow",
                  constructedWetlandHorizontalSubsurfaceFlow:
                    "Constructed wetland with horizontal flow below the surface",
                  constructedWetlandVerticalSubsurfaceFlow:
                    "Constructed wetland with vertical flow below the surface",
                  septicTank: "Septic tank",
                  septicTankLandDispersal: "Septic tank with spreading",
                  stagnantSewer: "Stagnant sewer",
                  flowingSewer: "Flow sewer",
                  latrineDryHousehold: "Domestic dry latrine",
                  latrineDryCommunal: "Collective dry latrine",
                  latrineWetOrFlush: "Wet or flush latrine",
                  aquaticDischarge: "Direct release into an aquatic environment",
                },
              },
              sludge: {
                title: "Destination of sludge",
                description:
                  "Add the physical destinations of the sludge and provide their annual wet mass.",
                addLabel: "Add a destination",
                rowLabelPrefix: "Destination",
                fields: {
                  destination: "Destination",
                  destinationPlaceholder: "Choose a destination",
                  withinMunicipalBoundary: "Within the municipal perimeter",
                  withinMunicipalBoundaryPlaceholder: "Choose an answer",
                },
                columns: {
                  mass: "Mass of wet sludge",
                  methaneRecovery: "Methane recovered",
                  nitrogenApplied: "Nitrogen applied",
                  sludgeType: "Sludge type",
                  climate: "Climate",
                  landfillSiteType: "Type of landfill",
                  landfillIdentifier: "Site ID",
                },
                destinations: {
                  anaerobicDigestion: "Anaerobic digestion",
                  composting: "Composting",
                  landfill: "Landfill",
                  incineration: "Incineration",
                  landApplication: "Spreading",
                  notEstimated: "Destination not estimated",
                },
                withinMunicipalBoundary: { true: "Yes", false: "No" },
                help: {
                  mass: "Indicate the annual mass of wet sludge. It is independent of the organic load removed in the sludge (S).",
                  massLabel: "Information on sludge mass",
                  methaneRecovery: "Optional: leave blank if no methane is recovered.",
                  methaneRecoveryLabel: "Information on recovered methane",
                  nitrogenApplied: "Optional: enter the annual nitrogen applied when it is known.",
                  nitrogenAppliedLabel: "Information on applied nitrogen",
                  sludgeType: "Indicate the type of sludge sent to landfill.",
                  sludgeTypeLabel: "Information on the type of sludge",
                  climate: "Indicate the climate of the landfill site.",
                  climateLabel: "Climate information",
                  landfillSiteType: "Enter the type of landfill site.",
                  landfillSiteTypeLabel: "Site type information",
                  landfillIdentifier: "Enter the landfill site identifier.",
                  landfillIdentifierLabel: "Site ID information",
                  withinMunicipalBoundary:
                    "Indicate whether this sludge destination is located within the municipal perimeter.",
                  withinMunicipalBoundaryLabel: "Information on the municipal perimeter",
                },
              },
              fallback: {
                title: "Estimate based on population",
                description:
                  "Use the population data already provided when the annual domestic organic load is not known.",
                rows: {
                  utility: "Sanitation network/service",
                },
                columns: {
                  connectionPercentage: "Share of population connected",
                  foodWasteToSewer: "Food waste in the network",
                },
                help: {
                  connectionPercentage:
                    "Annual share of the population already informed which is connected to the sanitation network or service.",
                  connectionPercentageLabel: "Network connection information",
                  foodWasteToSewer:
                    "Indicate whether food waste is disposed of in the network. The default is no.",
                  foodWasteToSewerLabel: "Information on food waste",
                },
              },
            },
            trees: {
              trackedTreeCrops: {
                title: "Monitored tree crops ",
                description: "Add the species monitored in detail in the territory.",
                addLabel: "Add an essence",
                rowLabelPrefix: "Gasoline",
                fields: {
                  treeType: "Tree type",
                  treeTypePlaceholder: "Choose a type of tree",
                },
                columns: {
                  treeCanopyArea: "Tree canopy area (ha)",
                  youngTrees: "Young trees (count, optional)",
                  adultTrees: "Adult trees (count, optional)",
                  senescentTrees: "Senescent trees (count, optional)",
                },
                treeTypes: {
                  oliveTrees: "Olive trees",
                  almondTrees: "Almond trees",
                  palmTrees: "Palm trees",
                  tableGrapes: "Table grapes",
                  citrus: "Citrus",
                  applesPears: "Apples/Pears",
                  apricots: "Apricots",
                  pomegranates: "Pomegranates",
                  figs: "Figs",
                  quinces: "Quinces",
                  loquats: "Medlars",
                  peaches: "Peaches",
                  plums: "Plums",
                  pistachios: "Pistachios",
                  cherryTrees: "Cherry trees",
                  nutsAndOthers: "Nuts and others",
                },
              },
              fruitTrees: {
                title: "Fruit trees",
                treeCanopyAreaLabel: "Canopy area",
                countLabel: "Number of fruit trees (optional)",
              },
              treeCanopyAreaHelpLabel: "Definition of canopy area",
              treeCanopyAreaHelp:
                "The canopy area corresponds to the ground surface covered by the crowns of the trees, and not to the total area of the plot.",
            },
            perennialPlantationStock: {
              title: "Perennial plantations",
              description: "Add a planting group and choose a type.",
              addLabel: "Add a plantation",
              rowLabelPrefix: "Planting",
              stickyLabel: "Planting",
              fallbackRowLabel: "Planting",
              removeLabel: "Delete",
              fields: {
                plantType: "Planting type",
              },
              placeholders: {
                plantType: "Planting type",
              },
              columns: {
                youngHectares: "Ha young (ha)",
                adultHectares: "Ha adults (ha)",
                oldHectares: "Ha old (ha)",
                totalHectares: "Ha total",
                youngTrees: "Young trees",
                adultTrees: "Mature trees",
                oldTrees: "Ancient trees",
                totalTrees: "Total trees",
              },
              plantOptions: {
                oliveTrees: "Olive trees",
                almondTrees: "Almond trees",
                palmTrees: "Palm trees",
                tableGrapes: "Table grapes",
                citrus: "Citrus",
                applesPears: "Apples/Pears",
                apricots: "Apricots",
                pomegranates: "Pomegranates",
                figs: "Figs",
                quinces: "Quinces",
                loquats: "medlars",
                peaches: "Peaches",
                plums: "Plums",
                pistachios: "Pistachios",
                cherryTrees: "Cherry trees",
                nutsAndOthers: "Nuts and others",
              },
            },
            livestock: {
              title: "Livestock",
              description: "Provide information on annual numbers and manure management systems.",
              yearSelector: "Choose a year",
              columns: {
                count: "Workforce",
              },
              manureManagement: {
                title: "Manure management systems",
                description:
                  "The distribution is generally stable: enter a year, unless practices change from year to year.",
                tier2Notice: {
                  title: "Level 2 data.",
                  description:
                    "Unlike Level 1, which applies an overall factor per animal type, Level 2 distinguishes each manure management system for a more precise estimate.",
                },
                systems: {
                  solidStorage: "Solid storage",
                  liquidSlurry: "Slurry",
                  dryLot: "Dry feedlot",
                  pastureRangePaddock: "Pasture, range or enclosure",
                  burnedForFuel: "Burned as fuel",
                },
              },
              poultryManureManagement: {
                title: "Poultry Manure Management Systems",
                description:
                  "The distribution is generally stable: enter a year, unless practices change from year to year.",
                systems: {
                  poultryManureWithLitter: "Poultry manure with litter",
                  poultryManureWithoutLitter: "Poultry manure without litter",
                  dryLot: "Dry feedlot",
                  anaerobicLagoon: "Anaerobic lagoon",
                  pastureRangePaddock: "Pasture, range or enclosure",
                },
              },
              rows: {
                dairyCattle: "Dairy cattle",
                otherCattle: "Other cattle",
                sheep: "Sheep",
                goats: "Goats",
                horses: "Equine",
                donkeysMules: "Donkeys and mules",
                camels: "Camels",
                broilers: "Broilers",
                layingHens: "Laying hens",
                turkeys: "Turkeys",
              },
            },
            fertilizers: {
              title: "Fertilizer",
              description: "Enter the annual tonnage and tenure.",
              yearSelector: "Choose a year",
              columns: {
                quantity: "Quantity",
                tenure: "Tenure (%)",
              },
              rows: {
                ammonitrate: "Ammonitrate",
                dap: "DAP",
                urea: "Urea",
              },
            },
            agriculturalProduction: {
              title: "Agricultural production",
              description: "Add a crop and enter the annual data.",
              addLabel: "Add a culture",
              rowLabelPrefix: "Culture",
              fields: {
                cropType: "Crop type",
                cropTypePlaceholder: "Choose a culture",
              },
              measures: {
                harvestedArea: "Harvested area",
                production: "Production",
              },
              cropOptions: {
                wheat: "Wheat",
                barley: "Barley",
                peasChickpeas: "Peas + chickpeas",
                beansBroadBeans: "Beans + feverolas",
                alfalfa: "Alfalfa",
                potatoes: "Potatoes",
              },
            },
            treesParksWaste: {
              yearlyTitle: "Trees / parks / urban green waste",
              yearlyDescription:
                "Structure from the input document: urban trees, green waste and annual destinations.",
              yearly: {
                treeCanopyArea: "Canopy area of urban trees",
                urbanTrees: "Number of urban trees (optional)",
                greenWaste: "Quantity of urban green waste",
                composting: "Composting destination",
                controlledLandfill: "Destination controlled discharge",
                uncontrolledLandfill: "Uncontrolled discharge destination",
              },
              treeCanopyAreaHelpLabel: "Definition of canopy area",
              treeCanopyAreaHelp:
                "The canopy area corresponds to the ground surface covered by the crowns of the trees, and not to the total area of the plot.",
            },
          },
          evidence: {
            title: "Evidence, notes and gaps",
            description:
              "The dataset must remain usable: where is the file, who carries it, what is still missing and what has been estimated.",
            sourcesTitle: "Expected sources",
            gapsTitle: "Open points",
            fileLabel: "File or export",
            filePlaceholder: "e.g. export_source_2023.xlsx",
            ownerLabel: "Responsible actor or unit",
            ownerPlaceholder: "e.g. Technical management or sectoral partner",
            notesLabel: "Clarifying notes",
            notesPlaceholder:
              "Document here the estimates, missing files, external validations or points that are still fragile.",
            missingLabel: "Shortfalls to raise",
            missingPlaceholder:
              "List here what is still missing to make this game usable over the active year.",
          },
          readout: {
            title: "Quick inventory reading",
            description:
              "We keep a light reading of the result to verify that the collection already produces something readable, without transforming the route into a dashboard.",
            summaryLabel: "Current reading",
          },
          completeness: {
            title: "State of completeness",
            description:
              "The completeness remains visible, but at the bottom of the page and in a compact version.",
            progressLabel: "Overall progress",
            checksLabel: "Checkpoints",
            ready: "Ready",
            pending: "To lift",
          },
        },
        families: {
          municipalPatrimoine: {
            title: "Municipal assets",
          },
          territorialEnergy: {
            title: "Territorial energy",
          },
          transportMobility: {
            title: "Transport and mobility",
          },
          afat: {
            title: "AFAT",
          },
          waste: {
            title: "Waste",
          },
          wastewater: {
            title: "Sanitation",
          },
        },
        datasets: {
          fleet: {
            title: "Fleet",
            description:
              "Municipal game with fleet composition and annual vehicle/consumption/expense block.",
            sourceMode: "Native source: a fleet table can cover several years.",
            yearMode:
              "Year-native: the state by year must remain explicit and never empty silently.",
            implementationNote:
              "The panel takes the finished structure of the input document and sets it to the active year to remain practical.",
          },
          publicLighting: {
            title: "Public lighting",
            description:
              "Municipal game with network infrastructure, lamps by type, electricity consumption and annual bill.",
            sourceMode: "Native source: a public lighting table can remain the main source.",
            yearMode: "Year-native: consumption and invoice must remain readable by year.",
            implementationNote:
              "The panel takes the finished structure of the input document and focuses the entry on the active year.",
          },
          buildings: {
            title: "Buildings",
            description:
              "The report cites this dataset, but the input file does not yet fix its exact fields.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO annual fields and stable fields.",
            implementationNote:
              "Temporary block to keep the dataset visible on the collection page.",
          },
          treesParksWaste: {
            title: "Trees / parks / municipal waste",
            description: "The report mentions this family, but the product entry remains open.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO annual blocks and exact perimeter.",
            implementationNote: "Temporary block to keep the entire municipal family visible.",
          },
          electricity: {
            title: "Electricity demand",
            description: "Known territorial energy dataset, without finalized field structure.",
            sourceMode: "TODO between supplier, sector, use or aggregate file.",
            yearMode: "TODO multi-year reading and completeness per year.",
            implementationNote:
              "Placeholder visible to keep the energy territory architecture complete.",
          },
          photovoltaic: {
            title: "Photovoltaic",
            description:
              "Territorial energy dataset cited by the report, without finalized field details.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO production blocks or annual capacity.",
            implementationNote: "Voluntary placeholder for the energy panel.",
          },
          naturalGas: {
            title: "Natural gas",
            description:
              "Territorial energy dataset known, but still without fixed entry structure.",
            sourceMode: "TODO supplier vs sector vs aggregate.",
            yearMode: "TODO inter-annual comparison logic.",
            implementationNote: "Volunteer placeholder for the complete inventory route.",
          },
          solarWaterHeating: {
            title: "Solar water heater",
            description: "Territorial energy dataset cited, still in product placeholder mode.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO production, number of installations or capacity.",
            implementationNote:
              "Voluntary placeholder so as not to lose the dataset in the architecture.",
          },
          port: {
            title: "Port data",
            description:
              "The report cites this transport game, but the product structure is not yet decided.",
            sourceMode: "TODO split by sub-mode or single source.",
            yearMode: "TODO temporality and carry-forward.",
            implementationNote: "Placeholder transport to see the complete architecture.",
          },
          buses: {
            title: "Public road transport",
            description: "Quoted transport game, without finalized field structure.",
            sourceMode: "TODO split by sub-mode or operator.",
            yearMode: "TODO annual blocks and granularity level.",
            implementationNote: "Placeholder voluntary public transport.",
          },
          urbanRail: {
            title: "Urban rail transport",
          },
          airTransport: {
            title: "Air transport",
            description: "Transport game cited, still in the form of a reserved place on the page.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO volume of activity and annual mesh.",
            implementationNote: "Placeholder air transport volunteer.",
          },
          territoryVehicles: {
            title: "Territorial road park",
            description:
              "The territory's road park template has not yet been transformed into a product field model.",
            sourceMode: "TODO source-first, year-first or hybrid.",
            yearMode: "TODO logic proxies, comparisons and annual validation.",
            implementationNote: "Placeholder general voluntary transportation.",
          },
          wastewaterTreatment: {
            title: "Treatment and rejection",
            description: "Treatment systems and discharges of treated effluents.",
            sourceMode: "Annual entry by system and by destination.",
            yearMode: "The loads and masses remain indicated by inventory year.",
            implementationNote: "Conditional details will be added at the individual system level.",
          },
          wastewaterNitrogen: {
            title: "Nitrogen and N₂O",
            description: "Annual nitrogen data by treatment system.",
            sourceMode: "Annual entry by system.",
            yearMode: "The data remains reported by inventory year.",
            implementationNote: "Conditional details will be added at the individual system level.",
          },
          wastewaterSludge: {
            title: "Sludge",
            description: "Physical destinations and annual masses of sludge.",
            sourceMode: "Annual entry by destination.",
            yearMode: "The masses remain informed by year of inventory.",
            implementationNote: "Conditional details will be added at each destination level.",
          },
          sanitation: {
            title: "Sanitation",
            description:
              "The report cites sanitation, but the input file does not yet define the fields.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO annual volumes and installation logic.",
            implementationNote: "Placeholder voluntary sanitation.",
          },
          sanitationContinuation: {
            title: "Sanitation continued",
            description: "Sanitation suite not yet defined as a product.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO inter-annual continuation.",
            implementationNote: "Placeholder sanitation voluntary continuation.",
          },
          sanitationCh4: {
            title: "CH4 sanitation",
            description: "Breakdown sanitation CH4 not yet exposed in the product.",
            sourceMode: "TODO exposes direct or app layer.",
            yearMode: "TODO annual blocks and level of detail.",
            implementationNote: "Volunteer CH4 placeholder.",
          },
          sanitationN2o: {
            title: "N2O sanitation",
            description: "Breakdown sanitation N2O not yet exposed in the product.",
            sourceMode: "TODO exposes direct or app layer.",
            yearMode: "TODO annual blocks and level of detail.",
            implementationNote: "Voluntary N2O placeholder.",
          },
          trees: {
            title: "Trees",
            description: "AFAT tree game with monitored crops and aggregated fruit trees.",
            sourceMode: "Native source: tree sources can cover several years.",
            yearMode: "Year-native: the areas and numbers of trees remain annual.",
            implementationNote: "The panel combines monitored crops and fruit trees.",
          },
          livestock: {
            title: "Breeding",
            description: "AFAT game quotes, still without product field contract.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO temporality and classifications.",
            implementationNote: "Voluntary AFAT placeholder.",
          },
          fertilizers: {
            title: "Fertilizer",
            description: "AFAT game quotes, still in provisional block produced.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO annual logic and scope.",
            implementationNote: "Voluntary AFAT placeholder.",
          },
        },
      },
      overview: {
        eyebrow: "Inventory space",
        title: "Structure of the municipal inventory, scope and level of proof",
        description:
          "Treat one area at a time, keep the same reference year and attach the source documents that justify each data set.",
        stats: {
          domains: {
            label: "Domains",
          },
          completed: {
            label: "Loans",
          },
          files: {
            label: "Files",
            value: "11",
          },
          readiness: {
            label: "State",
            value: "In review",
          },
        },
      },
      rail: {
        eyebrow: "Inventory map",
        title: "Collection areas",
        description:
          "Select an area to review the scope, expected datasets and supporting documents.",
      },
      validation: {
        title: "Missing points",
        description:
          "The basis is usable, but certain elements still need to be justified before submission.",
        missing: [
          "Fleet fuel totals are still missing for the mobility department.",
          "No evidence file is yet attached for the methodological notes.",
        ],
      },
      priority: {
        mandatory: "Mandatory",
        recommended: "Recommended",
        advanced: "Advanced",
      },
      status: {
        todo: "To do",
        complete: "Complete",
        inProgress: "In progress",
        missing: "Missing",
      },
      workspace: {
        eyebrow: "Active domain",
        scopeTitle: "Perimeter note",
        readinessTitle: "Level of preparation",
        readinessHint:
          "Keep raw files, working hypotheses and manual entries attached to the same domain to keep the inventory auditable.",
        requirementsTitle: "Required datasets",
        fieldsTitle: "Work entry",
        ownerLabel: "Responsible unit",
        ownerPlaceholder: "e.g. Municipal technical services",
        summaryLabel: "Current collection summary",
        notesTitle: "Method notes",
        notesPlaceholder:
          "Note here any missing values, proxy logic, or questions to be addressed in the next collection pass.",
        summaryTitle: "Current status",
        evidenceTitle: "Supporting documents",
        qaTitle: "Quality control",
        qaDescription:
          "Before submission, verify that each data set can be linked to an operator export, an invoice, a spreadsheet or a documented estimate note.",
      },
      tray: {
        title: "Preparing for submission",
        description: "{count} domains still need to be reviewed before freezing the base.",
      },
      workspacePanels: {
        scenarios: {
          eyebrow: "Active module",
          title: "BaU / BaC scenarios",
          description:
            "This module will transform the reference series into emissions trajectories for 2030, with a trend scenario and a transition scenario.",
          dependenciesTitle: "This module depends on",
          dependencies: [
            "A validated IRE and an additional year to compare trends.",
            "Assumptions of growth, activity and scope by sector.",
            "An inventory base sufficiently clean to distinguish between municipal and territorial.",
          ],
          outputsTitle: "This module will produce",
          outputs: [
            "A BaU trajectory by sector and by year.",
            "A BaC trajectory based on transition hypotheses.",
            "A reduction gap that can be mobilized for the action plan.",
          ],
        },
        planning: {
          eyebrow: "Active module",
          title: "Planning",
          description:
            "Planning will organize priorities, dependencies and the sequence of work based on the scenarios and actions selected.",
          dependenciesTitle: "This module depends on",
          dependencies: [
            "Actions already structured by sector or by lever.",
            "A clear reading of the priorities and implementation constraints.",
            "Identified managers and a shared time horizon.",
          ],
          outputsTitle: "This module will produce",
          outputs: [
            "One deployment sequence per period.",
            "Milestones and dependencies between actions.",
            "A roadmap the municipality can use.",
          ],
        },
        "action-plan": {
          eyebrow: "Active module",
          title: "Action plan",
          description:
            "The action plan will translate the scenarios into operational sheets with objectives, actors, impacts, costs and status.",
          dependenciesTitle: "This module depends on",
          dependencies: [
            "Sufficiently stabilized BaU / BaC scenarios.",
            "Prioritized sectors and mitigation levers.",
            "A governance base to designate carriers and partners.",
          ],
          outputsTitle: "This module will produce",
          outputs: [
            "A structured portfolio of stock files.",
            "Expected carbon impacts per action.",
            "Managers, calendars and monitoring indicators.",
          ],
        },
        investments: {
          eyebrow: "Active module",
          title: "Investments",
          description:
            "The investments module will bring together the costs, arbitrations, financing and phasing associated with the selected actions.",
          dependenciesTitle: "This module depends on",
          dependencies: [
            "An action plan already structured with identified measures.",
            "Estimated investment volumes per share or per sector.",
            "An annual or multi-annual phasing logic.",
          ],
          outputsTitle: "This module will produce",
          outputs: [
            "A breakdown of investments by sector.",
            "An annual schedule of financial needs.",
            "Groupings by municipality, action or program.",
          ],
        },
      },
      modules: {
        items: {
          "city-profile": {
            title: "City profile",
            description: "Basic information for setting up inventory.",
            count: "4 confirmed configuration fields",
            scope:
              "Use this domain to establish the municipality's identity, boundaries and reference year before examining assets or territorial datasets.",
            readiness: "The scope and reference year are already aligned.",
            summary:
              "The inventory is currently configured around Sfax, Tunisia, with 2023 as the base year and a fixed reference population.",
            checklist: [
              "Official name of the municipality and geographical boundaries.",
              "Reference year used in all collection areas.",
              "Population value or most recent demographic proxy.",
              "Short governance note for the inventory holder.",
            ],
            evidence: [
              "Municipality identification note and administrative boundary reference.",
              "Decision note on the reference year shared for the entire inventory.",
              "Population source or planning document used for configuration.",
            ],
            fields: {
              cityName: "City name",
              country: "Country",
              population: "Population",
              referenceYear: "Reference year",
            },
            placeholders: {
              cityName: "e.g. Sfax",
              country: "e.g. Tunisia",
              population: "e.g. 330000",
              referenceYear: "ex. 2026",
            },
            helper:
              "Tip: keep the same reference year in all modules to maintain a comparable basis.",
          },
          "collectivity-assets": {
            title: "Municipal assets",
            description: "Level 1 — Mandatory: buildings, public lighting, fleet, green spaces.",
            count: "3 datasets assembled, fleet still partial",
            scope:
              "Gather assets that the municipality directly owns or operates. This area must remain focused on controlled infrastructure and service equipment.",
            readiness:
              "Buildings and lighting are usable; fleet data still needs to be consolidated.",
            summary:
              "Buildings and public lighting already have structured surveys. Fleet fuel totals and green space management notes remain incomplete.",
            checklist: [
              "Buildings by use, surface area and annual consumption of electricity, gas or fuel if available.",
              "Public lighting points, types of lamps, installed power and annual electricity consumption.",
              "Fleet inventory by vehicle type, fuel, annual mileage and owner service.",
              "Green spaces, trees and green waste management for areas managed by the municipality.",
            ],
            evidence: [
              "Electricity and gas bills for municipal buildings.",
              "Lighting maintenance inventory or operator spreadsheet.",
              "Export of the rolling stock with annual mileage or fuel logs.",
            ],
          },
          "territorial-data": {
            title: "Territorial data",
            description: "Scopes 2 and 3: city-wide energy, transport, waste, wastewater.",
            count: "2 batches of linked sources",
            scope:
              "Use this domain for city-scale datasets that describe the entire territory, not just municipal operations. Keep operator sources and proxy methods visible.",
            readiness:
              "The energy and waste configuration is in place; transport proxies still require a pass.",
            summary:
              "The electricity demand and waste treatment references are already linked. The transport activity still relies on temporary proxies.",
            checklist: [
              "Electricity demand by sector across the entire municipal territory.",
              "Fuel or mobility proxies for road traffic, public transport and service provision.",
              "Tonnages of household waste and wastewater, treatment methods and installation references.",
              "Population, household or growth hypotheses used to frame territorial data.",
            ],
            evidence: [
              "Operator or distributor export for electricity demand.",
              "Wastewater treatment plant activity report and survey of household waste tonnages.",
              "Traffic counts, transport studies or regional mobility estimates.",
            ],
          },
          documents: {
            title: "Documents and evidence",
            description: "Recommended: attach files that support the inventory.",
            count: "0 evidence files attached",
            scope:
              "Keep source documents grouped by subject area so that reviewers can quickly attach each value to a file, note, or export operator.",
            readiness: "The proof structure exists, but the repository is still empty.",
            summary:
              "No shared evidence file is yet attached. This is today the main obstacle to rereading, even when the values ​​are already entered.",
            checklist: [
              "Invoices, statements and operator exports in CSV, Excel or PDF.",
              "Technical inventories, audits or maintenance sheets used for calculations.",
              "Contracts, order documents and project notes which justify the assumptions.",
              "A tree structure that clearly links each file to a collection domain.",
            ],
            evidence: [
              "Energy bills or operator exports for each family of municipal assets.",
              "Planning reports or audits cited in territorial estimates.",
              "Methodological note explaining where proxies are used.",
            ],
          },
          assumptions: {
            title: "Assumptions and proxies",
            description:
              "Advanced: Track estimates, confidence level, and methods for missing data.",
            count: "1 method note started",
            scope:
              "Use this area to document each proxy, each estimation step, and each reserve of confidence that must accompany the basis during the review.",
            readiness: "A first method note exists, but the confidence rating is still absent.",
            summary:
              "A draft note already describes the proxy logic for transport, but the inventory still lacks confidence levels and a clear list of actions to take per dataset.",
            checklist: [
              "Notes on missing data and estimation method applied to each missing data.",
              "Confidence level or review flag for each major dataset.",
              "Attribution note for the source or institution behind each estimate.",
              "Short list of improvements for the next iteration of the inventory.",
            ],
            evidence: [
              "Method note on transport proxy hypotheses.",
              "Justification of the confidence level for the quality of electricity and waste data.",
              "Review checklist for unresolved data discrepancies before submission.",
            ],
          },
        },
      },
    },
    helpCategory: {
      questionnaire: {
        badge: "Quiz help",
        title: "Questionnaire",
        subtitle: "Getting started, progressing and correcting answers",
        intro:
          "This page helps you complete the assessment step by step during the testing phase, with practical answers to the most common blockages.",
        summaryTitle: "On this page",
        summaryItems: [
          "Prepare useful information before starting",
          "Follow the route step by step",
          "Correct an answer or resume later",
          "Know when to contact the team",
        ],
        prep: {
          title: "Before you start",
          items: [
            "Log in to your account to access the form.",
            "Allow approximately 15 to 25 minutes to complete the assessment.",
            "Prepare useful information: usual trips, energy consumption and bills if available.",
          ],
        },
        flow: {
          title: "How the questionnaire is carried out",
          steps: [
            "Open the guided tour from your user space.",
            "Answer questions about transportation.",
            "Complete the energy part of the home.",
            "Validate your answers to access the results page.",
          ],
        },
        corrections: {
          title: "Correct or retake the assessment",
          resumeQuestion: "Can I resume later?",
          resumeAnswer:
            "Yes. You can return to your session and continue the assessment until it is finalized.",
          afterSubmitQuestion: "I sent an incorrect response, what should I do?",
          afterSubmitAnswer:
            "Rerun a new assessment with the correct data to get an updated result.",
        },
        issues: {
          title: "Common problems",
          items: [
            {
              title: "The next button does not go through",
              description:
                "Check the required fields and requested formats. A missing or invalid field blocks progress to the next step.",
            },
            {
              title: "I don't have all my bills",
              description:
                "Use a reasonable estimate based on your habits. You can repeat the evaluation later with more precise data.",
            },
            {
              title: "The form does not open",
              description:
                "Make sure you're signed in with the correct account, then reload the page before trying again.",
            },
          ],
        },
        scope: {
          title: "Current scope of this route",
          current:
            "The questionnaire is in the testing phase and currently covers the personal journey.",
          limits: [
            "Active range: transportation and home energy.",
            "Not currently available: team/company workflow.",
            "Not currently available: audit/compliance reporting.",
            "Not currently available: real-time tracking, compensation and external integrations.",
          ],
        },
        support: {
          title: "When to contact the team",
          description:
            "If the blocking continues after the checks above, use the Contact page with specific context.",
          checklistTitle: "Information to include in your message:",
          checklist: [
            "Your account email",
            "The type of problem encountered",
            "Steps to reproduce the blockage",
            "A screenshot if possible",
          ],
        },
        actions: {
          backToCategories: "Back to categories",
          contact: "Go to Contact page",
          startForm: "Open form",
        },
      },
      results: {
        badge: "Help results",
        title: "Results",
        subtitle: "Understanding the CO2 estimate and recommendations",
        intro:
          "This page explains how to read your estimate, interpret the categories displayed, and use the recommendations provided.",
        summaryTitle: "On this page",
        summaryItems: [
          "Read the main result in tonnes of CO2",
          "Understanding the transport and energy part of the household",
          "Use recommendations as an action plan",
          "Identify when to reassess",
        ],
        readingGuide: {
          title: "How to read the results page",
          steps: [
            "Start with the main result displayed in tonnes of CO2.",
            "Compare the categories presented to identify the highest positions.",
            "See the recommendations associated with each category.",
            "Define 1 to 2 priority actions then reassess after a few changes.",
          ],
        },
        indicators: {
          title: "What the results show",
          items: [
            {
              title: "Main result",
              description: "An overall estimate of your footprint based on the answers provided.",
            },
            {
              title: "Breakdown by category",
              description: "A view of the emission stations to understand where to act first.",
            },
            {
              title: "Recommendations",
              description: "Practical courses of action linked to your most impactful categories.",
            },
          ],
        },
        recommendations: {
          title: "How to use recommendations",
          items: [
            "First choose actions that can be done quickly.",
            "Keep longer-term actions as tracking goals.",
            "Make an estimate again to measure the evolution after your changes.",
          ],
        },
        limits: {
          title: "Current scope of results",
          description: "During the testing phase, the results mainly cover the personal journey.",
          items: [
            "Active range: transportation and home energy.",
            "Some interface values still remain under consolidation.",
            "No audit/compliance reporting or export of reports.",
            "No continuous real-time monitoring.",
          ],
        },
        support: {
          title: "When to contact the team",
          description:
            "If a value seems inconsistent or if the results page is not displayed correctly.",
          checklistTitle: "Useful information to transmit:",
          checklist: [
            "Account email",
            "The approximate date/time of the assessment",
            "The point considered inconsistent in the results",
            "A screenshot if possible",
          ],
        },
        actions: {
          backToCategories: "Back to categories",
          contact: "Go to Contact page",
          restart: "Redo an assessment",
        },
      },
      account: {
        badge: "Account help",
        title: "Account",
        subtitle: "Login, access and account recovery",
        intro:
          "Quick guides for creating an account, logging in, confirming email and regaining access during the testing phase.",
        quickAccess: {
          title: "Quick access",
          items: [
            {
              title: "Create an account",
              description: "Open a new account before starting the evaluation.",
              href: "/auth/sign-up",
            },
            {
              title: "Log in",
              description: "Access your session to resume your journey.",
              href: "/auth/sign-in",
            },
            {
              title: "Forgotten password",
              description: "Request a reset link by email.",
              href: "/auth/forgot-password",
            },
          ],
        },
        faqs: {
          title: "Frequently asked questions",
          items: [
            {
              title: "I can't connect",
              description:
                "Check the email, password, then confirm that your email address has been validated.",
            },
            {
              title: "I did not receive the confirmation email",
              description:
                "Check your spam/junk folders, then resend from the confirmation screen.",
            },
            {
              title: "My password is refused",
              description: "Use the Forgotten Password option to set a new password.",
            },
            {
              title: "Reset link or code does not work",
              description: "Request a new code and use the most recent one received by email.",
            },
            {
              title: "My account seems blocked",
              description:
                "Contact the team with the account email and the exact context of the blockage.",
            },
          ],
        },
        flow: {
          title: "Recommended route",
          steps: ["Create the account.", "Confirm email.", "Log in.", "Access the questionnaire."],
        },
        errorMap: {
          title: "Common error messages",
          columns: {
            message: "Message displayed",
            meaning: "What this means",
          },
          items: [
            {
              label: "Invalid identifiers",
              meaning: "The email or password entered is incorrect.",
            },
            {
              label: "Confirmation required",
              meaning: "The account email is not yet confirmed.",
            },
            {
              label: "Blocked account",
              meaning: "The account requires support intervention.",
            },
            {
              label: "Service unavailable",
              meaning: "The service is temporarily unavailable. Try again later.",
            },
          ],
        },
        support: {
          title: "When to contact the team",
          description: "If the problem persists after checking above, use the Contact page.",
          checklistTitle: "Information to include:",
          checklist: [
            "Account email",
            "The exact error message displayed",
            "Steps taken before blocking",
            "The browser and device used",
          ],
        },
        actions: {
          backToCategories: "Back to categories",
          contact: "Go to Contact page",
        },
      },
    },
    contact: {
      badge: "Contact",
      title: "Contact the Carbon Cut team",
      description:
        "Send your request via the form below. Processing is done by email during the testing phase.",
      emailLabel: "Direct contact",
      responseTime: "Response generally within 24 to 48 working hours.",
      checklistTitle: "This page is for sending a clear request with:",
      checklist: [
        "Your account email",
        "The type of problem (connection, form, result)",
        "Steps to reproduce the issue",
        "A screenshot if possible",
      ],
      scopeTitle: "Current scope",
      scopeDescription:
        "This page is for users of the personal journey under test (transport and household energy).",
      form: {
        name: "Name",
        email: "Email",
        topic: "Subject",
        message: "Message",
        submit: "Send request",
        notLive: "The form is in place, sending will be activated soon.",
      },
      actions: {
        goHelp: "Go to help center",
        startForm: "Start the assessment",
      },
    },
    Home: { index: "Home" },
    Blog: { index: "Blog" },
    Categories: { index: "Categories" },
  },
  "(auth)": {
    login: {
      title: "Log in",
      description: "Log in to start your carbon pre-assessment.",
      sessionExpired: "Your session has expired. Log in to resume your journey.",
      form: {
        email: "Email",
        password: "Password",
        submit: "Sign in",
      },
      message: {
        signup: "Don't have an account?",
        or: "OR",
      },
      link: {
        signup: "Register",
        forgetPassword: "Forgotten password?",
      },
      error: {
        invalidCredentials: "Invalid credentials.",
        confirmationRequired: "Please confirm your email before continuing.",
        blocked: "This account is blocked. Contact support.",
        providerDisabled: "Password sign in is currently unavailable.",
        generic: "Unable to connect at the moment.",
      },
    },
    signup: {
      title: "Create an account",
      description: "Create your account before starting the questionnaire.",
      highlights: {
        ariaLabel: "Carbon Cut highlights",
        items: [
          {
            title: "Measure with clarity",
            description:
              "Start with a guided assessment of your personal footprint, with a simple, step-by-step path.",
          },
          {
            title: "Stick to the basics",
            description:
              "The current flow focuses on transport and household energy items for a useful first reading.",
          },
          {
            title: "Take action",
            description:
              "After the calculation, consult a structured result and concrete ways to reduce your impact.",
          },
        ],
      },
      form: {
        fullName: "Full name",
        username: "Username",
        email: "Email",
        password: "Password",
        passwordConfirm: "Confirm password",
        submit: "Create an account",
      },
      message: {
        login: "Already have an account?",
        or: "OR",
      },
      link: {
        login: "Log in",
      },
      error: {
        identifierTaken: "This email or username is already in use.",
        disabled: "Registration is disabled at this time.",
        defaultRole: "The registration configuration is incomplete.",
        passwordMismatch: "Passwords do not match.",
        generic: "Unable to create account at this time.",
      },
    },
    forgetPassword: {
      title: "Recover your account",
      description: "Receive a reset code by email.",
      form: {
        email: "Email",
        submit: "Send",
        password: "New password",
        passwordConfirm: "Confirm the new password",
      },
      message: {
        email: "Check your email",
        code: "We have sent a verification link to your email address",
        success: "If an account exists for this email, a reset message has been sent.",
      },
      error: {
        passwordMismatch: "Passwords do not match.",
        invalidCode: "The reset code is invalid.",
      },
      link: {
        login: "Log in",
      },
    },
    verify: {
      title: "Confirm your email",
      description: "Enter the code received by email to activate your session.",
      message: {
        email: "We have sent a verification code to {email}.",
        pending: "Your registration is pending. Confirm your email to log in.",
        sent: "If the account exists and is not confirmed, a new email has been sent.",
      },
      form: {
        submit: "Confirm Email",
        reset: "Resend email",
        code: "Confirmation code",
      },
      toast: {
        succ: "The email has been sent.",
      },
      error: {
        invalidToken: "The confirmation code is invalid.",
        alreadyConfirmed: "This email is already confirmed. Log in.",
        blocked: "This account is blocked. Contact support.",
        genericResend: "Unable to resend confirmation email.",
        genericConfirm: "Unable to confirm email at this time.",
      },
      link: {
        login: "Log in",
      },
    },
    resetPassword: {
      title: "Set a new password",
      description: "Choose a new password for your account.",
      requestNewLink: "Request a new link",
      form: {
        code: "Reset code",
        password: "New password",
        passwordConfirm: "Confirm password",
        submit: "Update password",
      },
      error: {
        generic: "Unable to reset password at this time.",
        invalidLink: "This reset link is invalid or expired.",
        missingLink: "Open the link received by email to reset your password.",
      },
    },
    common: {
      cta: {
        backHome: "Return to home",
        signIn: "Log in",
        signUp: "Create an account",
        retry: "Try again",
        logout: "Sign out",
      },
      error: {
        unavailable: "The authentication service is currently unavailable. Please try again later.",
      },
      message: {
        loading: "Loading session...",
      },
    },
  },
  "(user)": {
    items: {
      Account_Settings: {
        title: "Account Settings",
        Profile: "Profile",
      },
      Prefrences: {
        title: "Preferences",
        Notifications: "Notifications",
        Language: "Language",
      },
      Payments: {
        title: "Payments",
        Card_information: "Map information",
      },
      Security: {
        title: "Security",
        PassAuth: "Password and auth",
      },
    },
    profile: {
      title: "Public profile",
      form: {
        username: "username",
        email: "email",
        birthDate: "date of birth",
        gender: {
          title: "sex",
          male: "man",
          female: "women",
        },
        country: "country",
        submit: "Update profile",
      },
      image: {
        tooltip: "upload a new photo",
        title: "Download",
      },
    },
    authentication: {
      title: "Change password",
      form: {
        currentPassword: "current password",
        password: "new password",
        passwordConfirmation: "confirm the new password",
        submit: "Change password",
      },
    },
  },
  forms: {
    preAssessment: {
      slides: [
        {
          title: "Duration & precision",
          visualLabel: "15–25 minutes",
          note: "The length of the form as well as the detail and refinement of the questions determine, to a large extent, the reliability of the results. This is our distinctive asset.",
          items: {
            duration: {
              title: "Estimated duration",
              description: "15–25 minutes to complete the assessment",
            },
            measure: {
              title: "What we measure",
              description: "Estimate your carbon footprint based on your answers",
            },
            accuracy: {
              title: "Level of precision",
              description: "Indicative results based on declarative data",
            },
          },
        },
        {
          title: "Sections & data",
          items: {
            transport: {
              title: "Transportation",
              description: "Car, public transport, flights",
            },
            energy: {
              title: "Energy",
              description: "Electricity, gas, home heating",
            },
            food: {
              title: "Food & Waste",
              description: "Eating habits and waste management",
            },
            data: {
              title: "Necessary data",
              description: "Energy bills, annual mileage, consumption habits",
            },
          },
        },
        {
          title: "Data & access",
          items: {
            privacy: {
              title: "Privacy",
              description: "Your data is confidential and used only for your diagnosis",
            },
            save: {
              title: "Backup",
              description: "Resume your assessment at any time",
            },
            results: {
              title: "Access to results",
              description: "Results available for X days before subscription",
            },
          },
        },
      ],
      cta: "Get started",
      next: "Next",
      stepIndicator: "{current} step on {total}",
    },
    basic: {
      energy: {
        housing: {
          title: "Housing",
          q1: {
            q1: "Tell us about your accommodation:",
            q1Labels: {
              type: "type",
              area: "surface",
              heatedVolume: "heated volume",
              conditionedVolume: "air-conditioned volume",
            },
            options: ["apartment", "house", "villa", "other"],
            q2: "How many bedrooms do you have?",
            q3: "Does your house have:",
            q3Labels: {
              thermalInsulation: "thermal insulation",
              insulatedGlazing: "double glazing",
            },
            alert: {
              title: "Note",
              description:
                "We ask these questions to better understand your situation and provide you with more accurate advice and information.",
            },
          },
        },
        heating: {
          title: "heating system",
          q: "What type of heating system do you use to heat your home?",
          badge: {
            multi: "Multiple selection",
            incomplete: "To complete",
          },
          options: {
            heatPump: { label: "Heat pump", unit: "null" },
            electricity: { label: "Electricity", unit: "null" },
            electricHeating: {
              label: "Electric heating",
              unit: "null",
              fields: {
                energyLabel: "Energy label",
                dailyFrequency: {
                  label: "Daily frequency",
                  unit: "h/days",
                },
                annualFrequency: {
                  label: "annual frequency",
                  unit: "less/year",
                },
                nbUnit: "number of individual unit",
              },
            },
            electricalCentralHeating: {
              label: "Electric central heating",
              unit: "null",
              fields: {
                energyLabel: "Energy label",
                dailyFrequency: {
                  label: "Daily frequency",
                  unit: "h/days",
                },
                annualFrequency: {
                  label: "annual frequency",
                  unit: "less/year",
                },
              },
            },
            gasNetwork: { label: "Gas network", unit: "null" },
            heatNetwork: { label: "Heat network", unit: "null" },
            GPL: {
              title: "Liquefied petroleum gas (LPG)",
              label: "Liquefied petroleum gas (LPG)",
              description: "Select the types of gas you use and indicate the renewal frequency",
              unit: "Bottle",
              quantity: "Quantity",
              big: "Large Format",
              small: "Small Format",
              types: {
                propane: "Propane: 35kg green/gold", // 35 Kg
                butane: "Butane: 13kg dark blue/red", //13
                butaneSmall: "Butane: 5.5kg red", //5.5
                butaneBig: "Butane: 10kg red/blue", //10
                propaneSmall: "Propane: 5kg yellow", //5
                propaneBig: "Propane: 13kg green/gold", //13
              },
              frequency: {
                placeholder: "Frequency",
                month: "every month",
                year: "every year",
              },
            },
            gasTank: { label: "Gas tank", unit: "null" },
            QgasTank: {
              title: "Gas tank",
              q: "Additional information about the gas tank",
              l1: "Frequency",
              u1: "fillings/year",
              l2: "Capacity",
              u2: "L",
            },
            fioul: {
              q: "Additional information on the use of fuel oil",
              label: "Domestic fuel",
              unit: "L/frequency",
              placeholder: "quantity",
              frequency: {
                label: "Frequency",
                month: "month",
                year: "year",
              },
            },
            charcoal: {
              label: "Coal",
              unit: "kg/",
              frequency: "frequency",
              qunits: {
                label: "unit",
                kg: "kg",
                m3: "m3",
              },
              funits: {
                label: "Frequency",
                day: "day",
                week: "week",
                month: "month",
                year: "year",
              },
            },
            wood: {
              label: "Wood",
              title: "Wood and Coal",
              quantity: "Quantity",
              unit: "kg/",
              frequency: "frequency",
              types: {
                hardwood: "Hardwoods",
                hardWoodExemples: "Examples: oak, beech, ash",
                softwood: "Softwood",
                softWoodExemples: "Examples: pine, fir, spruce",
              },
              qunits: {
                label: "unit",
                kg: "kg",
                m3: "m3",
                stere: "stere",
              },
              funits: {
                label: "Frequency",
                day: "day",
                week: "week",
                month: "month",
                year: "year",
              },
            },
          },
          q2: {
            q: "what is the type of your fireplace?",
            title: "FireplaceType",
            rows: {
              insert: "Insert",
              stove: "frying pan",
              openFireplace: "openFireplace",
              woodBoiler: "woodBoiler",
            },
          },
        },
        q1: {
          title: "electricity bill",
          q1: "Using your electricity bill as a reference, what was your electricity consumption over the past 12 months?",
          q2: "What is the index of your electricity meter?",
          q3: "If you don't have your bill, what was your monthly electricity expense this year?",
          note: {
            title: "Tip",
            description:
              "If you have the consumption, indicate it in kWh. Otherwise, indicate your expense in €. You can complete both.",
          },
          labels: {
            preferred: "Consumption (preferred)",
            fallback: "Monthly expense",
          },
          Total: "Total",
        },
        q2: {
          title: "gas bill",
          q1: "Using your gas bills as a reference, what was your gas consumption over the last 12 months?",
          q2: "What is your gas meter reading?",
          q3: "If you don't have your bill, what was your monthly gas expense over the last year?",
          Total: "Total",
          alert: {
            title: "Note",
            description:
              "If your bill is not monthly, you can enter a single value for the entire period. For example: March: 0, April: 0, May: 1020.",
          },
        },
        heatingBill: {
          title: "Heat networks",
          q: "Using your heating network bills as a reference, what was your consumption over the last 12 months?",
          q2: "What is the index of your heat meter?",
          q3: {
            q: "If you don't have your bills, what was your annual expense this year?",
            money: "Total expenses",
            price: "Price of one kWh",
          },
        },
      },
      transport: {
        qCar: {
          q: "How many cars does your household own?",
        },
        qAux: {
          q: "Do you use auxiliary transport?",
          electricBike: "Electric bikes",
          electricScooter: "Electric scooter",
        },
        qMotos: {
          qMoto: {
            q: "How many motorcycles does your household have?",
          },
          "qMoto1-1": {
            q: "Motorcycle information",
            l1: "Brand",
            l2: "Model",
          },
          "qMoto1-2": {
            q: "What type of motorcycle do you have?",
            Gasoline: "Gasoline",
            Diesel: "Diesel",
            "natural Gaz": "Bio-gas",
            Electrique: "Electric",
            "Plug-in Hybrid": "Plug-in hybrid",
            "mild Hybrid": "Mild hybrid",
          },
          qMoto2: {
            q: "Additional information",
            l3: "Year",
            l4: "Displacement",
            l5: "Consumption per 100 km",
          },
          qMoto3: {
            q1L: "How many liters does your motorcycle consume per week?",
            q1E: "How much electricity (in kWh) does your motorcycle consume per week?",
            q2: "If you do not know consumption, you can provide your weekly expenses.",
            q3: "How far does your motorcycle travel each week?",
          },
          qMoto4: {
            q: "What is the total distance displayed on your motorcycle's dashboard?",
          },
        },
        "qCar1-1": {
          title: "Car {index}: Information about the car",
          q: "Car information",
          l1: "Brand",
          l2: "Model",
          notListed: "Not on the list?",
          backToList: "Return to list",
          otherMakeLabel: "Other brand",
          otherMakePlaceholder: "Enter the brand",
          otherModelLabel: "Other model",
          otherModelPlaceholder: "Enter the model",
        },
        "qCar1-2": {
          title: "Car {index}: type of car",
          q: "What type of car do you have?",
          Gasoline: "Gasoline",
          Diesel: "Diesel",
          "natural Gaz": "Bio-gas",
          Electrique: "Electric",
          "Plug-in Hybrid": "Plug-in hybrid",
          "mild Hybrid": "Mild hybrid",
          other: "Other",
        },
        "qCar1-3": {
          title: "Car {index}: car fuel",
          q: "What fuel does the thermal part of your hybrid use?",
          Gasoline: "Gasoline",
          Diesel: "Diesel",
          "natural Gaz": "Bio-gas",
          other: "Other",
        },
        qCar2: {
          title: "Car {index}: Additional information",
          q: "Additional information",
          l3: "Year",
          l4: "Displacement",
          l11: "Fuel consumption (L per 100 km)",
          l12: "L / 100 km",
          l21: "Electric consumption (kWh per 100 km)",
          l22: "kWh / 100 km",
          l5: "Distance traveled per week",
          u5: "km",
        },
        qCar3: {
          title: "Car {index}: Car consumption",
          q1L: "How many liters does your car consume per week?",
          q1E: "How much electricity (in kWh) does your car consume per week?",
          q1LL: "Liters per week",
          q1LE: "kWh per week",
          q2: "If you do not know consumption, you can provide your weekly expenses.",
          note: {
            title: "Tip",
          },
          modes: {
            money: "In euros spent",
          },
          labels: {
            moneySpent: "Amount spent per week",
            price: "Price of {unit}",
          },
          q3: "How far does your car travel each week?",
        },
        qCar4: {
          title: "Car {index}: Total distance displayed",
          q: "What is the total distance displayed on your car dashboard?",
        },
        carStatus: {
          label: "Car {index}",
          incomplete: "To complete",
        },
        commonTransport: {
          shortDistances: {
            title: "Common means of transport",
            q: "What are the common means of transportation used by everyone in your household?",
            titles: {
              bus: "Buses",
              metro: "Metro",
              train: "Train",
              covoiturage: "Carpooling",
              add: "Added",
              trip: "Travel",
            },
            covoiturage: {
              make: "Brand",
              engine: "Car type",
              people: "carpool people",
              frequency: "weekly frequency",
              engines: {
                Gasoline: "Gasoline",
                Diesel: "Diesel",
                "natural Gaz": "Bio-gas",
                Electrique: "Electric",
                "Plug-in Hybrid": "Plug-in hybrid",
                "mild Hybrid": "Mild hybrid",
                other: "Other",
              },
              distance: "distance",
            },
            bus: {
              busType: "type of bus",
              frequency: "weekly frequency",
              nbPeople: "family people",
              distance: "distance",
              busTypes: {
                electric: "Electric",
                diesel: "Diesel",
                gasoline: "Gasoline",
                hybrid: "Hybrid",
                naturalGaz: "natural gas",
              },
            },
            metro: {
              frequency: "weekly frequency",
              distance: "distance",
              nbPeople: "family people",
            },
          },
          longueDistances: {
            title: "Long-distance means of transport",
            q: "What means of long-distance transportation do everyone in your household use?",
            bus: {
              busTypes: {
                other: "Other",
                diesel: "Diesel",
              },
            },
            train: {
              types: {
                intercity: "Intercity",
                TER: "TER",
                TGV: "TGV",
              },
              frequency: "weekly frequency",
              distance: "distance",
              nbPeople: "family people",
              type: "type of train",
            },
          },
          qAir: {
            q: "Have you traveled by plane this year?",
            lT: "Yes",
            lF: "No",
            q1: {
              q: "Details of your flights",
              description: "Add your annual flight details",
              origin: "Origin",
              destination: "Destination",
              stopover: "stopover",
              via: "Through",
              frequency: "Annual frequency",
              aircraftType: "Type Airplane",
              class: "Flight class",
              roundTrip: "Back and forth",
              carbonEmissions: "Carbon Emissions",
              distance: "Distance",
              originDestinationError: "Origin and destination identical or not found.",
            },
          },
          qSea: {
            q: "Did you travel by sea last year?",
            lT: "Yes",
            lF: "No",
            q1: {
              fluvial: "River",
              wcar: "with Car?",
              ferry: "Ferry",
              cruise: "Cruise",
              distance: "distance",
              frequency: "annual frequency",
            },
          },
        },
      },
      food: {
        cols: {
          homemade: "Made at home",
          quantine: "Canteen or restaurant",
          delivered: "Delivered",
        },
        basic: {
          q1: {
            title: "Distribution of meals",
            text: "On average, which meals best describe your household's consumption during a typical week?",
          },
          nb: "The total number of meals should be approximately 14 X the number of people in your family.",
          q2: {
            title: "Meal location",
            text: "For each meal selected, indicate where your household consumes it approximately in a week?",
            helper: "The sum of the 3 columns must equal the total indicated.",
            note: "Indication that filling is approximate.",
            enteredLabel: "Entered: {entered} / {total}",
          },
          meals: {
            redMeat: "Red meat",
            whiteMeat: "White meat",
            oilyFish: "Oily fish",
            whiteFish: "White fish",
            vegan: "Vegan",
            vegetarian: "Vegetarian",
          },
        },
        breakfast: {
          q1: {
            title: "Breakfasts",
            text: "On average, how many breakfasts does your household consume in a typical week?",
          },
          nb: "The total number of meals should be approximately 7 X the number of people in your family.",
          q2: {
            title: "Breakfast location",
            text: "For each meal selected, indicate where your household consumes it approximately in a week?",
            helper: "The sum of the 3 columns must equal the total indicated.",
            note: "Indication that filling is approximate.",
            enteredLabel: "Entered: {entered} / {total}",
          },
          meals: {
            bread: "Bread",
            salty: "Salty",
            milk: "Milk & Cereals",
            fruits: "Fruit",
            no: "No breakfast",
          },
        },
        restaurants: {
          q: {
            title: "Restaurant visits",
            text: "In a typical month, how many times does your household visit each type of restaurant?",
          },
          fastFood: "Fast food",
          bistro: "Bistro",
          classic: "Classic restaurant",
          gastronomic: "Gourmet restaurant",
          bio: "Organic restaurant",
          unit: "times/month",
        },
        drinks: {
          q1: {
            title: "Daily hot drinks",
            q: "How many cups per day does each member of your family drink of the following beverages?",
            tea: "Tea",
            coffee: "Coffee",
            hotChocolate: "Hot chocolate",
            unit: "cups/day",
          },
          q2: {
            title: "Weekly drinks",
            q: "How many liters per week does each member of your family drink the following drinks?",
            soda: "Soda",
            jus: "Juice",
            beer: "Beer",
            alcohol: "Alcohol",
            unit: "liters/week",
          },
        },
        water: {
          title: "Drinking habits",
          q: "What type of water do you drink?",
          tapWater: "Tap water",
          tapWaterFilter: "Filtered tap water",
          bottle: "Bottled water",
          q2: "How many bottles of water does your household consume?",
          frequency: {
            label: "Frequency",
            day: "day",
            week: "week",
            month: "month",
          },
        },
        auxilary: {
          q1: {
            title: "Seasonal products",
            text: "What percentage of seasonal produce is in your household?",
          },
          q2: {
            title: "Local products",
            text: "What is the percentage of local products in your household?",
          },
        },
        markets: {
          q: {
            title: "Frequency of races",
            text: "How often does your household visit each of the following types of stores?",
          },
          options: {
            hyperMarket: "Hypermarket",
            big_boxStore: "Large area store",
            supermarket: "Supermarket",
            groceryStore: "Grocery store",
            weeklyMarket: "Weekly market",
          },
          unit: "times per",
          frequency: {
            year: "year",
            month: "month",
            week: "week",
            placeholder: "Select a frequency",
          },
        },
      },
      waste: {
        general: {
          waste: {
            q: "What is the total amount of waste generated in your household?",
            ...waste,
          },
        },
        precise: {
          q: "If you carry out selective sorting of waste, for which of these wastes can you estimate the quantities:",
          type: "Type",
          labels: {
            recylablePackaging: "Recyclable packaging (plastics, cardboard, metals)",
            paper: "Papers (newspapers, magazines)",
            glass: "Glass (bottles and jars)",
            organic: "Organic waste",
          },
          waste: waste,
        },
        details: {
          wasteDestination: {
            q: "If you do not practice selective sorting, do you have an idea of the final destination of your household waste?",
            placeholder: "Select a destination",
            options: {
              incineration: "Incineration",
              recycling: "Recycling",
              landfilling: "Landfill",
              composting: "Composting",
              biomethanation: "Biomethanization",
              idk: "I don't know",
            },
          },
          personalCompost: {
            q: "Do you prepare your compost yourself at home for your personal use?",
            yes: "Yes",
            no: "No",
          },
          biodigest: {
            q1: {
              q: "Do you have a home biodigester for your personal use?",
              yes: "Yes",
              no: "No",
            },
            q2: {
              q: "Can you indicate your production?",
              electric: {
                q: "Electricity",
                amount: "Quantity",
                unit: "kWh",
                frequency: "Frequency",
              },
              biogas: {
                q: "Biogas",
                amount: "Quantity",
                unit: "m³",
                frequency: "Frequency",
              },
              frequencies: {
                month: "month",
                year: "year",
              },
            },
          },
        },
        water: {
          q1: {
            q: "indicate the overall average amount of your sanitation bill:",
            unit: "€",
            frequency: {
              placeholder: "frequency",
              month: "month",
              year: "year",
            },
          },
          q2: {
            q: "indicate overall the average quantity of water taken into account in the sanitation section of your bill.",
            frequency: {
              placeholder: "frequency",
              month: "month",
              year: "year",
            },
            unit: cubiqueMeter,
          },
          q3: {
            q: "If possible, indicate your water meter index",
          },
        },
      },
    },
    yes: "yes",
    no: "no",
    unit: "in {unit}",
    idk: "I don't know",
    progress: {
      title: "Question {current} about {total}",
      percentage: "{value}% completed",
    },
    next: "Continue",
    back: "Previous",
    preview: "Overview",
    submit: "Result",
    errors: {
      Required: "Mandatory",
      Invalid: "Invalid",
      nonNegative: "0 or more",
      between0And100: "Value between 0 and 100",
      manureManagementSharesMustTotal100:
        "The distribution of manure management systems must total 100%.",
      collectivityCountryInvalid: "Choose a valid country.",
      collectivityProjectSlugInvalid: "Use only lowercase letters, numbers and hyphens.",
      collectivityProjectSlugNotUnique: "This slug already exists. Choose another one.",
      collectivityYearMustBePast: "Current year and future years are not allowed.",
      collectivityInventoryYearInvalid: "Each year of inventory must be valid.",
      collectivityInventoryYearsDuplicate: "Each year of inventory must be unique.",
      collectivityInventoryYearsReferenceMissing:
        "The reference year must also appear in the inventory years.",
      woodTypeRequired: "Select at least one type of wood.",
      food: {
        minMeals: "The total meals must be at least 7.",
        distributionMismatch: "The distribution must correspond to the number of meals indicated.",
      },
      market: {
        missingPair: "The frequency and its unit must be entered together.",
      },
    },
  },
  result: {
    card: {
      title: "Your carbon footprint",
      subtitle: "Based on your lifestyle",
      unit: "tonnes CO₂/year",
      tons: "tons",
      avgGlobal: "vs Global Average",
      difference: "Difference",
    },
    categorisation: {
      title: "Breakdown by category",
    },
    woodNotice: {
      title: "Wood matters in your footprint",
      description:
        "Your total is higher because it includes the biogenic CO₂ (scope 1N) from the wood. This choice remains favorable compared to fossil fuels.",
    },
    recommendations: {
      title: "Ways to reduce your impact",
      transport: {
        transportation: {
          title: "Transportation",
          desc: "Opt for public transportation, carpooling or cycling",
        },
      },
      energy: {
        energy: {
          title: "Energy",
          desc: "Switch to renewable sources and improve insulation",
        },
      },
      food: {
        diet: {
          title: "Food",
          desc: "Reduce meat consumption and buy local food",
        },
      },
      waste: {
        waste: {
          title: "Waste",
          desc: "Recycle more and practice composting",
        },
      },
      footer: {},
    },
    footer: {
      download: "Download the report",
      share: "Share your result",
      retake: "Resume assessment",
    },
  },
  sections: {
    transport: "Transportation",
    energy: "Energy",
    waste: "Waste",
    food: "Food",
    vacation: "Vacation",
  },
  utils: {
    months: {
      January: "January",
      February: "February",
      March: "March",
      April: "April",
      May: "May",
      June: "June",
      July: "July",
      August: "August",
      September: "September",
      October: "October",
      November: "November",
      December: "December",
    },
  },
  locale: "en",
  language: "English",
} as const;
