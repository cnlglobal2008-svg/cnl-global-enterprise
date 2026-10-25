(() => {
  const products = [
    {
      name: "Garlic Powder",
      category: "Dehydrated garlic",
      description: "Fine, free-flowing garlic ingredient for seasoning, blends and food manufacturing.",
      image: "https://images.pexels.com/photos/4871137/pexels-photo-4871137.jpeg?auto=compress&cs=tinysrgb&w=1200",
      focus: "Mesh / grade / packing"
    },
    {
      name: "Garlic Flakes",
      category: "Dehydrated garlic",
      description: "Dried garlic flakes for food service, ingredient buyers and private-label applications.",
      image: "https://images.pexels.com/photos/15040170/pexels-photo-15040170.jpeg?auto=compress&cs=tinysrgb&w=1200",
      focus: "Cut size / colour / packing"
    },
    {
      name: "Onion Powder",
      category: "Dehydrated onion",
      description: "Convenient powdered onion ingredient for dry mixes, sauces, snacks and seasoning.",
      image: "https://images.pexels.com/photos/8871292/pexels-photo-8871292.jpeg?auto=compress&cs=tinysrgb&w=1200",
      focus: "Mesh / flavour profile / packing"
    },
    {
      name: "Onion Flakes",
      category: "Dehydrated onion",
      description: "Dried onion flakes for culinary, ingredient and further-processing requirements.",
      image: "https://images.pexels.com/photos/4916115/pexels-photo-4916115.jpeg?auto=compress&cs=tinysrgb&w=1200",
      focus: "Flake size / moisture / packing"
    },
    {
      name: "Whole & Ground Spices",
      category: "Spice selection",
      description: "Additional spice requirements discussed against your market, specification and quantity.",
      image: "https://images.pexels.com/photos/31280796/pexels-photo-31280796.jpeg?auto=compress&cs=tinysrgb&w=1200",
      focus: "Product / origin / grade"
    },
    {
      name: "Custom Requirements",
      category: "Sourcing support",
      description: "Share your target product, buyer requirement or private-label brief for discussion.",
      image: "https://images.pexels.com/photos/5223782/pexels-photo-5223782.jpeg?auto=compress&cs=tinysrgb&w=1200",
      focus: "Tell us your requirement"
    }
  ];

  const productGrid = document.querySelector("#product-grid");
  const productSelect = document.querySelector("#inquiry-product");
  const toast = document.querySelector("#toast");
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4800);
  };

  const setProduct = (name) => {
    if (productSelect) productSelect.value = name;
    document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => productSelect?.focus(), 500);
  };

  if (productGrid) {
    productGrid.innerHTML = products.map((product) => `
      <article class="product-card" data-product="${product.name}">
        <img class="product-card__image" src="${product.image}" alt="${product.name} product presentation" loading="lazy" />
        <div class="product-card__content">
          <span class="product-card__tag">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <button class="product-link" type="button" data-product="${product.name}">Send inquiry for best price <span aria-hidden="true">→</span></button>
        </div>
      </article>`).join("");
    productGrid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-product]");
      if (button) setProduct(button.dataset.product);
    });
  }

  if (productSelect) {
    products.forEach(({ name }) => productSelect.insertAdjacentHTML("beforeend", `<option value="${name}">${name}</option>`));
  }

  document.querySelector("#year")?.append(new Date().getFullYear());

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });
  mainNav?.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      mainNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (menuToggle) menuToggle.textContent = "Menu";
    }
  });

  const escapeHtml = (value) => String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const radarForm = document.querySelector("#radar-form");
  const radarResult = document.querySelector("#radar-result");
  radarForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(radarForm).entries());
    const title = `${data.marketType}: ${data.product} in ${data.market}`;
    const profile = data.profile || "buyer with a clear product, quantity and procurement fit";
    const brief = [
      `BUYER RADAR RESEARCH BRIEF`,
      `Focus: ${title}`,
      `Ideal buyer: ${profile}`,
      ``,
      `1. Search targets`,
      `- Importers, distributors, food manufacturers and private-label brands in ${data.market}.`,
      `- Prioritise companies that show a relevant product category, real address and business contact route.`,
      ``,
      `2. Record for each prospect`,
      `- Company legal/trading name, website, country/city, product fit, source URL, decision-maker route, date checked.`,
      ``,
      `3. Verification before labelling a lead as qualified`,
      `- Compare company website, registry/trade profile where available and address/contact consistency.`,
      `- Check that the buyer's current product range can reasonably use ${data.product}.`,
      `- Use an independently found company contact route; never rely on a single unverified message.`,
      `- Record evidence as Verified, Partially verified or Unverified — never call it genuine without evidence.`,
      ``,
      `4. Safe next action`,
      `- Draft a short specification-first introduction; obtain owner approval before outreach.`,
      `- Do not send samples, credit, documents or money without the appropriate commercial checks.`,
      ``,
      `This research brief does not guarantee buyers, orders, payment or lead authenticity.`
    ].join("\n");
    radarResult.hidden = false;
    radarResult.innerHTML = `
      <h3>Research brief ready: ${escapeHtml(title)}</h3>
      <p>Use this to build a reviewable lead list. Keep the evidence for every company; a promising website or enquiry alone is not proof that a buyer is genuine.</p>
      <div class="radar-result__grid">
        <div><h4>Search priority</h4><ol><li>Find ${escapeHtml(profile)}.</li><li>Prioritise relevant ingredient, distribution and manufacturing businesses in ${escapeHtml(data.market)}.</li><li>Record the source URL and date checked.</li></ol></div>
        <div><h4>Verification gate</h4><ul><li>Company existence and matching web/address details</li><li>Real product fit for ${escapeHtml(data.product)}</li><li>Independent contact route and clear next step</li><li>Evidence label: Verified / Partial / Unverified</li></ul></div>
      </div>
      <button class="button radar-download" type="button" id="download-brief">Download research brief</button>`;
    radarResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    document.querySelector("#download-brief")?.addEventListener("click", () => {
      const blob = new Blob([brief], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `buyer-radar-${data.product.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${data.market.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    });
  });

  const inquiryForm = document.querySelector("#inquiry-form");
  inquiryForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(inquiryForm).entries());
    const subject = `Quotation inquiry — ${data.inquiryProduct || "Product requirement"} — ${data.market}`;
    const body = [
      "Hello CNL GLOBAL ENTERPRISE,",
      "",
      "Please share your best quotation for the following requirement:",
      `Product: ${data.inquiryProduct}`,
      `Quantity: ${data.quantity || "Not specified"}`,
      `Market: ${data.market}`,
      `Destination: ${data.destination || "Not specified"}`,
      "",
      "Requirement details:",
      data.message,
      "",
      "Buyer contact:",
      `Name: ${data.name}`,
      `Company: ${data.company || "Not specified"}`,
      `Email: ${data.email}`,
      `Phone/WhatsApp: ${data.phone || "Not specified"}`
    ].join("\n");
    const config = window.CNL_CONFIG || {};
    if (config.formEndpoint) {
      try {
        const response = await fetch(config.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ subject, ...data })
        });
        if (!response.ok) throw new Error("Form endpoint did not accept this inquiry.");
        inquiryForm.reset();
        const isFormSubmit = /formsubmit\.co/i.test(config.formEndpoint);
        showToast(isFormSubmit
          ? "Thank you — your inquiry was submitted. CNL GLOBAL ENTERPRISE will respond shortly."
          : "Thank you — your inquiry has been sent.");
        return;
      } catch (error) {
        showToast("The form endpoint could not be reached. Opening your email app instead.");
      }
    }
    const email = config.inquiryEmail || "";
    if (!email || /yourdomain\.com/i.test(email)) {
      showToast("Set the real inquiry email in assets/site-config.js before publishing. Your form details are still filled in this browser.");
      return;
    }
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast("Your email app should open with the completed inquiry.");
  });
})();

