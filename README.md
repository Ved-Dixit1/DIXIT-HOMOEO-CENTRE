# Dixit Homoeo Centre website

A responsive, multi-page website for Dixit Homoeo Centre in Balaghat, Madhya Pradesh. It is a plain HTML, CSS, and JavaScript site with no build step or package installation required.

## Pages

- **Home** (`index.html`) — clinic introduction, doctor portrait, and links to the main sections.
- **About** (`about.html`) — clinic and doctor information with the supplied doctor photos.
- **Care** (`care.html`) — care topics found in the public business listing, with a medical safety note.
- **Visit** (`visit.html`) — directions, listed hours, clinic exterior photo, and appointment request form.

Shared styling is in `styles.css`; page behavior, dark mode, and the appointment form are in `app.js`.

## Preview locally

Open `index.html` in a browser, or serve the folder locally:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Appointment request behavior

The form opens a prefilled WhatsApp message to the clinic number **+91 98934 57822**. The visitor must press **Send** in WhatsApp before the doctor receives the request. An appointment is not confirmed until the clinic replies.

The page also stores requests in that visitor's browser using `localStorage`. Those saved entries do not sync to the doctor's device or form an appointment dashboard. The message sent through WhatsApp contains the patient's name, phone number, and requested date; it does not include medical details.

## Photos

The `assets/` folder contains the doctor and clinic photos supplied for this website:

- `dr-virendra-dixit.jpg` — doctor portrait used on the homepage.
- `dr-virendra-dixit-clinic.jpg` — doctor portrait at the clinic, used on the About and Visit pages.
- `clinic-exterior-night.jpg` — clinic exterior, used on the Visit page and homepage content section.

These are local site assets, so they are included when the site is uploaded. No external stock photos are required.

## Publish with GitHub Pages

This repository includes `.github/workflows/pages.yml`, which deploys the repository root to GitHub Pages whenever a commit is pushed to `main`.

1. Upload the project files and folders to the root of the repository, including the hidden `.github/workflows/pages.yml` file, `CNAME`, and the complete `assets/` folder.
2. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the deployment source if it is not already selected.
3. Push/commit the uploaded files to the `main` branch. The Pages workflow will run under the **Actions** tab; wait for it to complete successfully.
4. The `CNAME` file requests `homoeo-healthcare.in`. Configure the domain's DNS records for GitHub Pages using GitHub's current instructions: <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>.
5. Once DNS has propagated and GitHub verifies the domain, enable **Enforce HTTPS** in **Settings → Pages**.

Until the custom domain is verified and its DNS points to GitHub Pages, it may not resolve. The canonical URLs and sitemap are set to `https://homoeo-healthcare.in/`.

## Before launch

- Confirm the clinic's displayed address and opening hours. The Google Maps, Justdial, and gallery references have differing business-listing details.
- Confirm the website's phone number and that the WhatsApp link reaches the intended clinic account.
- Test the appointment request on a phone with WhatsApp installed and confirm the message contents before relying on it.
- Keep medical claims accurate and have the clinic review the care-topic descriptions.

## Search indexing

`robots.txt`, `sitemap.xml`, page descriptions, canonical links, and MedicalClinic structured data are included. After the domain is live, submit the sitemap in Google Search Console and verify the business details in the clinic's Google Business Profile. These files help search engines understand the site; they do not guarantee rankings.
