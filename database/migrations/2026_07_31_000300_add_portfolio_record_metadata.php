<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('experiences', function (Blueprint $table) {
            $table->string('employment_type')->nullable()->after('company');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->string('company')->nullable()->after('category');
            $table->date('start_date')->nullable()->after('image_path');
            $table->date('end_date')->nullable()->after('start_date');
        });
    }

    public function down(): void
    {
        Schema::table('projects', fn (Blueprint $table) => $table->dropColumn(['company', 'start_date', 'end_date']));
        Schema::table('experiences', fn (Blueprint $table) => $table->dropColumn('employment_type'));
    }
};
