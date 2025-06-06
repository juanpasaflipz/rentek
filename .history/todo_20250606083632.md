# TODO List – Real Estate Platform Enhancements

## 🔧 Frontend Fixes & UI Enhancements

### 1. Fix "View Details" Buttons
- [ ] Ensure each "View Details" button properly links to and reveals detailed property information.
- [ ] Add a dynamic route or modal that fetches full listing data on click.

### 2. Improve Search Properties Filter
- [ ] Add new filter to allow users to search by **area/neighborhood**.
  - Example areas: *Polanco, Lomas de Chapultepec, La Condesa* (Mexico City)
- [ ] Retain and improve support for searching by **Código Postal (ZIP Code)**.
- [ ] Update UI dropdown or autocomplete component to include a list of known areas.

---

## 🛠️ Backend & Admin Dashboard

### 3. API Monitoring and Control (Admin Feature)
- [ ] Track all API requests made during property searches.
  - [ ] Log request type (GET/POST), endpoint hit, and timestamp.
  - [ ] Identify which API was used (e.g., EasyBroker, Inmuebles24, etc.)
  - [ ] Record API response status and time.
- [ ] Create admin dashboard view to:
  - [ ] Visualize number and type of API calls per provider.
  - [ ] Filter logs by date, search term, or API provider.
- [ ] Add admin control to:
  - [ ] Enable/disable specific API providers per search.
  - [ ] Set priority or fallback order of APIs for listings.

---

## ✅ Next Steps
- [ ] Assign tasks to frontend/backend devs.
- [ ] Estimate timeline for implementation and testing.
- [ ] Review API documentation (EasyBroker, etc.) for integration details.