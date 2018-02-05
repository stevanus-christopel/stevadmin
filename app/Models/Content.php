<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $table = 'STV_Contents';
    protected $primaryKey = 'Id';
    
    const CREATED_AT = 'CreatedAt';
    const UPDATED_AT = 'UpdatedAt';

    protected $fillable = ['ContentCode', 'Page', 'Title', 'Content', 'Language', 'Media', 'IsActive', 'CreatedBy', 'UpdatedBy'];
}