<?php

namespace App\Providers;

// use App\Models\Role;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // app('Spatie\Permission\PermissionRegistrar'::class)->setRoleClass(Role::class);
    }
}
