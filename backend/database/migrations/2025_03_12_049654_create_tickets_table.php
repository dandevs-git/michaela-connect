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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('title'); 
            $table->text('description');
            $table->enum('priority', ['normal', 'priority', 'urgent'])->default('normal');
            $table->enum('status', ['pending', 'approved', 'rejected', 'in_progress', 'resolved', 'failed', 'completed', 'reopened'])->default('pending');

            // Relationships
            $table->foreignId('requester_id')->constrained('users')->onDelete('cascade'); // User who submitted
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade'); // Department handling
            $table->foreignId('requester_head_id')->nullable()->constrained('users')->onDelete('set null'); // Head of Requester’s Dept
            $table->foreignId('assigned_head_id')->nullable()->constrained('users')->onDelete('set null'); // Head of Assigned Dept
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null'); // Assigned Staff

            // Timestamps
            $table->timestamp('resolved_at')->nullable();
            $table->timestamp('failed_at')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
