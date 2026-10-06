# Product specification

## Purpose

Help a curious external user understand the mapped environment around a location. The question is whether the general mapped context looks promising under a deliberately simple rubric, not whether a specific operator should sign a lease.

## Scope and acceptance

1. Validate a public address, obtain address-level candidates through Photon, and require explicit location confirmation. Show coordinates and warn that geocoders can mismatch.
2. Read the latest eligible Overture Places and Base release tiles covering a 600 m circle, with visible provider consent. Validate the complete needed tile set before scoring. Do not request device location.
3. Normalize supported shops, everyday services, and transit features. Strip names, contact details, and unrelated metadata. Keep public feature ID, point coordinates, recognized categories and transit flag.
4. Calculate three dimensions with equal weight. No unavailable dimension may be filled with a proxy or silent zero. No overall total if any dimension is unavailable.
5. Explain each dimension, geographic scope, data dates, incomplete coverage, and non-claims.
6. Provide two independently generated synthetic journeys, conspicuously labeled, that do not issue network requests.
7. Let the user download a bounded JSON result for historical reproduction. Do not persist or upload it automatically.
8. Deliver keyboard-operable responsive controls, informative errors, and an accessible score summary.

## Explicit exclusions

Demand, income, demographic segmentation, competition advantage, visibility, walkability, route travel times, visitation, financial recommendations, brand-specific scoring, confidential records, authentication, user accounts, server persistence, bulk address processing, learning, and AI-generated explanations are outside this release.

## Interpretation

Strong, Good, Moderate and Weak refer only to this published mapped-context rubric. They are not investment actions. A complete score describes three observed dimensions, not the completeness or accuracy of the map or an evidence-confidence measure.

The UI supports locations between 84° south and 84° north where providers return complete address data; live acceptance focuses on diverse U.S. public addresses. Addresses without numbers or complete address fields are unsupported. Building-center geocodes are approximate. Rural and car-oriented locations are systematically poorly represented by the chosen rubric. International differences in tags and map coverage prevent credible cross-market ranking.
