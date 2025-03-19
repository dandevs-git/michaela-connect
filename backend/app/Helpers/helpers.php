<?php

use App\Models\ActivityLog;

if (!function_exists('logActivity')) {
    function logActivity($user_id, $category, $action, $details)
    {
        ActivityLog::create([
            'user_id' => $user_id,
            'category' => $category,
            'action' => $action,
            'details' => $details,
            'pc_name' => gethostname(),
            'ip_address' => request()->ip(),
        ]);
    }
}
