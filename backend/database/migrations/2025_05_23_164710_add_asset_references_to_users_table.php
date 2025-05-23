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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('telephone_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('printer_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('internet_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('anydesk_id')->nullable()->constrained()->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['telephone_id']);
            $table->dropForeign(['printer_id']);
            $table->dropForeign(['internet_id']);
            $table->dropForeign(['anydesk_id']);

            $table->dropColumn(['telephone_id', 'printer_id', 'internet_id', 'anydesk_id']);
        });
    }
};
