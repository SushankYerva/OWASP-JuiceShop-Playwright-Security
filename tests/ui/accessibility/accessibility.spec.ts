import {
  test,
  expect,
} from '@fixtures/app.fixture';

import AxeBuilder from '@axe-core/playwright';

import {
  accessibilityBaseline,
} from '@config/accessibility-baseline';

test(
  'home page has no unexpected serious accessibility violations',
  {
    tag: [
      '@ui',
      '@accessibility',
    ],
  },
  async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({
      page,
    })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ])
      .analyze();

    const seriousViolations =
      results.violations.filter(
        violation =>
          violation.impact === 'serious' ||
          violation.impact === 'critical',
      );

      console.log(
        'ACCESSIBILITY VIOLATIONS:',
        JSON.stringify(
            seriousViolations.map(violation => ({
            id: violation.id,
            impact: violation.impact,
            nodes: violation.nodes.length,
            targets: violation.nodes.map(
                node => node.target,
            ),
            })),
            null,
            2,
        ),
    );
    const unexpectedViolations =
      seriousViolations.filter(
        violation => {
          const expectedCount =
            accessibilityBaseline.home[
              violation.id as keyof
                typeof accessibilityBaseline.home
            ];

          if (expectedCount === undefined) {
            return true;
          }

          return (
            violation.nodes.length >
            expectedCount
          );
        },
      );

    expect(
      unexpectedViolations,
      JSON.stringify(
        unexpectedViolations,
        null,
        2,
      ),
    ).toEqual([]);
  },
);

test(
  'login page has no unexpected serious accessibility violations',
  {
    tag: [
      '@ui',
      '@accessibility',
      '@authentication',
    ],
  },
  async ({ page }) => {
    await page.goto('/#/login');

    const results =
      await new AxeBuilder({
        page,
      })
        .withTags([
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
        ])
        .analyze();

    const seriousViolations =
      results.violations.filter(
        violation =>
          violation.impact === 'serious' ||
          violation.impact === 'critical',
      );


      console.log(
        'ACCESSIBILITY VIOLATIONS:',
        JSON.stringify(
            seriousViolations.map(violation => ({
            id: violation.id,
            impact: violation.impact,
            nodes: violation.nodes.length,
            targets: violation.nodes.map(
                node => node.target,
            ),
            })),
            null,
            2,
        ),
    );
    const unexpectedViolations =
      seriousViolations.filter(
        violation => {
          const expectedCount =
            accessibilityBaseline.login[
              violation.id as keyof
                typeof accessibilityBaseline.login
            ];

          if (expectedCount === undefined) {
            return true;
          }

          return (
            violation.nodes.length >
            expectedCount
          );
        },
      );

    expect(
      unexpectedViolations,
      JSON.stringify(
        unexpectedViolations,
        null,
        2,
      ),
    ).toEqual([]);
  },
);