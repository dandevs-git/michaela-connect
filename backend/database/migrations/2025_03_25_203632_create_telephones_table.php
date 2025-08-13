<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('telephones', function (Blueprint $table) {
            $table->id();
            $table->string('number')->unique();
            $table->string('cable_code')->unique();
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('telephone_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('telephone_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.  
     */
    public function down(): void
    {
        Schema::dropIfExists('telephone_user');
        Schema::dropIfExists('telephones');
    }
};
