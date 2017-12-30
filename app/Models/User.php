<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'STV_Users';
    protected $primaryKey = 'Id';
    
    const CREATED_AT = 'CreatedAt';
    const UPDATED_AT = 'UpdatedAt';

    protected $fillable = ['Username', 'Password', 'IsActive', 'CreatedBy', 'UpdatedBy'];
}