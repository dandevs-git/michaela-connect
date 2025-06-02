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
            $table->foreignId('department_id')->nullable()->constrained('departments')->onDelete('cascade');
            $table->foreignId('ipAddress_id')->nullable()->constrained('ip_addresses')->onDelete('set null');
            $table->foreignId('telephone_id')->nullable()->constrained('telephones')->onDelete('set null');
            $table->foreignId('printer_id')->nullable()->constrained('printers')->onDelete('set null');
            $table->foreignId('internet_id')->nullable()->constrained('internets')->onDelete('set null');
            $table->foreignId('anydesk_id')->nullable()->constrained('anydesks')->onDelete('set null');
            $table->foreignId('account_id')->nullable()->constrained('accounts')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['ipAddress_id']);
            $table->dropForeign(['telephone_id']);
            $table->dropForeign(['printer_id']);
            $table->dropForeign(['internet_id']);
            $table->dropForeign(['anydesk_id']);
            $table->dropForeign(['account_id']);

            $table->dropColumn(['department_id', 'ipAddress_id', 'telephone_id', 'printer_id', 'internet_id', 'anydesk_id', 'account_id']);
        });
    }
};
