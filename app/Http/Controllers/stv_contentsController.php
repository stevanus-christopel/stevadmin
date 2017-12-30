<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\stv_content;

class stv_contentsController extends Controller
{
    public function index()
    {
        return stv_content::all();
    }
 
    public function show(stv_content $stv_content)
    {
        return $stv_content;
    }
 
    public function store(Request $request)
    {
        $this->validate($request, [
            'contentCode' => 'required|unique:stv_contents|max:255',
            'page' => 'required',
            'content' => 'required',
            'createdBy' => 'required',
            'lastModifiedBy' => 'required',
        ]);

        $stv_content = stv_content::create($request->all());
 
        return response()->json($stv_content, 201);
    }
 
    public function update(Request $request, stv_content $stv_content)
    {
        $stv_content->update($request->all());
 
        return response()->json($stv_content, 200);
    }
 
    public function delete(stv_content $stv_content)
    {
        $stv_content->delete();
 
        return response()->json(null, 204);
    }
}
