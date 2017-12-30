<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UsersController extends Controller
{
    public function login(Request $request)
    {
        return User::where('Username' , $request->input('username'))
        ->where('Password' , $request->input('password'))
        ->where('IsActive' , 1)
        ->get();
    }
}
