# Laravel Nova setup

The portfolio models and Nova resources are ready. Nova itself is a commercial
package and must be installed with the owner's licensed credentials.

After configuring the official Nova Composer repository and credentials:

1. Require the Nova package version compatible with this Laravel release.
2. Run `php artisan nova:install`.
3. Run `php artisan migrate`.
4. Sign in at `/nova`.

The prepared resources manage the profile, skills, experience, projects, and
contact messages.
