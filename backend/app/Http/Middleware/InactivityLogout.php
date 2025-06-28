<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InactivityLogout
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user) {
            $now = Carbon::now();
            $last = $user->last_activity_at
                ? Carbon::parse($user->last_activity_at)
                : $now;

            $timeoutMinutes = 1;

            $diffMinutes = $last->diffInMinutes($now);

            // return response()->json([
            //     'now' => $now,
            //     'last' => $last,
            //     'timeoutMinutes' => $timeoutMinutes,
            //     'diffMinutes' => $diffMinutes,
            // ], 401);

            if ($diffMinutes >= $timeoutMinutes) {
                $user->tokens()->delete();

                return response()->json([
                    'message' => 'Session expired due to inactivity.',
                ], 401);
            }

            $user->update(['last_activity_at' => $now]);
        }

        return $next($request);
    }
}
