<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('type')->nullable();               // e.g., Google, Facebook, etc.
            $table->string('link')->nullable();               // link to the login page
            $table->string('username')->nullable();
            $table->string('password')->nullable();           // consider encrypting this!
            $table->string('department')->nullable();
            $table->string('purpose')->nullable();
            $table->string('recovery_email')->nullable();
            $table->string('recovery_number')->nullable();
            $table->string('verification')->nullable();       // 2-Step Verification info
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('account_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_user');
        Schema::dropIfExists('accounts');
    }
};
