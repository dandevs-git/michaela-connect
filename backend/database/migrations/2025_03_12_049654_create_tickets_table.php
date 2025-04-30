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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_number')->unique();
            $table->string('title');
            $table->text('description');
            $table->foreignId('priority_id')->constrained('priorities')->onDelete('cascade');
            $table->enum('status', ['pending', 'new', 'open', 'rejected', 'in_progress', 'resolved', 'failed', 'closed', 'reopened'])->default('pending');

            $table->foreignId('origin_department_id')->nullable()->constrained('departments')->onDelete('set null');
            $table->foreignId('requester_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('target_department_id')->nullable()->constrained('departments')->onDelete('set null');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');

            $table->timestamp('approved_at')->nullable();
            $table->timestamp('start_at')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamp('failed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('response_deadline')->nullable();
            $table->timestamp('resolution_deadline')->nullable();

            $table->boolean('sla_breached')->default(false);

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
