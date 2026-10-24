# Assignment 2 verification

**Student:** Agnes Joy

**Checked:** 24 October 2026

| Check | Result |
| --- | --- |
| Dependencies | Installed successfully; npm audit reported 0 vulnerabilities |
| Production build | Passed with Vite 7.3.7 |
| Live API directory | All 10 public sample employees rendered with ID, name and email |
| Name search | `leanne` returned 1 row |
| Email search | `Telly.Hoeger` returned 1 row |
| Empty search state | Unmatched search displayed an explanation and Clear search action |
| Clearing search | Restored all 10 records |
| Sort A–Z | First employee was Chelsey Dietrich |
| Sort Z–A | First employee was Patricia Lebsack |
| Sort by ID | Restored the original ascending ID order |
| API failure | Blocking the API request showed the directory error and Try again button |
| Retry | Removing the block and choosing Try again restored all 10 live employees |
| Navbar routes | Home and Employee Form opened the correct pages |
| Route refresh | Reloading the form URL preserved the correct route |
| Focus management | Navigation and the skip link focused main content |
| Required field | Empty name reported valueMissing |
| Whitespace validation | Whitespace-only name reported patternMismatch |
| Salary validation | Negative amount reported rangeUnderflow |
| Valid preview | Sample Employee, Web Developer, Kochi, and ₹40,000.00 displayed correctly |
| Preview freshness | Editing a field removed the previous preview |
| Reset | All four input values became empty |
| No POST | The only fetch is GET users; the form updates React state only |
| Phone dashboard | At 390px viewport, page width was 390px; the employee table scrolls within its panel |
| Phone form | At 390px viewport, page width was 390px and the form used one grid column |

Screenshots contain public JSONPlaceholder sample users and fictional form details. No real employee data or credentials are included.

Mobile checks used browser device emulation at 390 × 844. Desktop screenshots, mobile screenshots and browser DOM observations were reviewed. API blocking and device emulation were removed after verification.
