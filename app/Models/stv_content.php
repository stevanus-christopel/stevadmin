<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class stv_content extends Model
{
    protected $fillable = ['contentCode', 'page', 'content', 'createdBy', 'lastModifiedBy'];
}