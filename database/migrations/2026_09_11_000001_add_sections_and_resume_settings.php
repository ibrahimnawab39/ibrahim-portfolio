<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('sections', function (Blueprint $table) {
            $table->id(); $table->string('eyebrow')->nullable(); $table->string('title');
            $table->text('body'); $table->string('link_label')->nullable(); $table->string('link_url')->nullable();
            $table->boolean('published')->default(false); $table->unsignedInteger('order')->default(0); $table->timestamps();
        });
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('resume_headline')->nullable(); $table->text('resume_summary')->nullable();
            $table->string('education_title')->nullable(); $table->string('education_institution')->nullable();
            $table->string('education_period')->nullable();
        });
        Schema::table('experiences', fn (Blueprint $table) => $table->boolean('include_in_resume')->default(true));
        Schema::table('projects', fn (Blueprint $table) => $table->boolean('include_in_resume')->default(false));
    }
    public function down(): void {
        Schema::dropIfExists('sections');
        Schema::table('profiles', fn (Blueprint $table) => $table->dropColumn(['resume_headline', 'resume_summary', 'education_title', 'education_institution', 'education_period']));
        Schema::table('experiences', fn (Blueprint $table) => $table->dropColumn('include_in_resume'));
        Schema::table('projects', fn (Blueprint $table) => $table->dropColumn('include_in_resume'));
    }
};
