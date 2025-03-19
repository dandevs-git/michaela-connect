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
            $table->foreignId('requester_id')->constrained('users')->cascadeOnDelete(); // Staff who requested
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade'); // Requesting department
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null'); // Assigned staff
            $table->foreignId('assigned_department_id')->nullable()->constrained('departments')->onDelete('set null'); // Assigned department

            $table->string('title'); // Ticket subject
            $table->text('description'); // Issue details
            $table->enum('status', ['Pending', 'Approved by Head', 'Assigned', 'In Progress', 'Completed', 'Reopened', 'Failed'])->default('Pending'); // Ticket status
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
