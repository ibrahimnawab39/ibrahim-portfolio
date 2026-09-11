<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false)->after('password');
        });

        Schema::table('profiles', function (Blueprint $table) {
            $table->string('photo_path')->nullable()->after('location');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->string('image_path')->nullable()->after('category');
        });

        Schema::table('experiences', function (Blueprint $table) {
            $table->date('start_date')->nullable()->change();
        });

        DB::table('users')
            ->where('email', 'admin@ibrahimnawab.com')
            ->update(['is_admin' => true]);
    }

    public function down(): void
    {
        Schema::table('experiences', fn (Blueprint $table) => $table->date('start_date')->nullable(false)->change());
        Schema::table('projects', fn (Blueprint $table) => $table->dropColumn('image_path'));
        Schema::table('profiles', fn (Blueprint $table) => $table->dropColumn('photo_path'));
        Schema::table('users', fn (Blueprint $table) => $table->dropColumn('is_admin'));
    }
};
