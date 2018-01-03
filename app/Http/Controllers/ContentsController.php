<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Content;

class ContentsController extends Controller
{
    public function pages()
    {
        return Content::distinct()->get(['page']);
    }

    public function select()
    {
        return Content::orderBy('page', 'asc')->get();
    }
 
    public function insert(Request $request)
    {
        $this->validate($request, [
            'ContentCode' => 'required|unique:STV_Contents|max:255',
            'Page' => 'required',
            'Content' => 'required',
            'IsActive' => 'required',
            'CreatedAt' => 'required',
            'CreatedBy' => 'required',
            'UpdatedAt' => 'required',
            'UpdatedBy' => 'required',
        ]);

        $Content = Content::create($request->all());
 
        return response()->json($Content, 201);
    }
 
    public function update(Request $request)
    {
        $Content = Content::findorfail($request->Id);
        $Content->update($request->all());
 
        return response()->json($Content, 200);
    }
 
    // public function delete(stv_content $stv_content)
    // {
    //     $stv_content->delete();
 
    //     return response()->json(null, 204);
    // }
}
