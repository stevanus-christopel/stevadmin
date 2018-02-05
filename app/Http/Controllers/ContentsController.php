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

    public function select(Request $request)
    {
        $page = $request->query('page');
        $search = $request->query('search');
        $contentPage = $request->query('contentPage') - 1;

        $dataPerPage = 5;

        $Count = Content::where('Page', 'LIKE', '%'.$page.'%')->
        where(function($query) use ($search){
            $query->where('ContentCode', 'LIKE', '%'.$search.'%');
            $query->orWhere('Page', 'LIKE', '%'.$search.'%');
            $query->orWhere('Title', 'LIKE', '%'.$search.'%');
            $query->orWhere('Content', 'LIKE', '%'.$search.'%');
            $query->orWhere('Language', 'LIKE', '%'.$search.'%');
            $query->orWhere('Media', 'LIKE', '%'.$search.'%');
        })->count();

        if($contentPage * $dataPerPage > $Count) {
            $contentPage = $Count / $dataPerPage;
        }

        $Content = Content::where('Page', 'LIKE', '%'.$page.'%')->
        where(function($query) use ($search){
            $query->where('ContentCode', 'LIKE', '%'.$search.'%');
            $query->orWhere('Page', 'LIKE', '%'.$search.'%');
            $query->orWhere('Title', 'LIKE', '%'.$search.'%');
            $query->orWhere('Content', 'LIKE', '%'.$search.'%');
            $query->orWhere('Language', 'LIKE', '%'.$search.'%');
            $query->orWhere('Media', 'LIKE', '%'.$search.'%');
        })->
        skip(($contentPage * $dataPerPage))->limit($dataPerPage)->
        orderBy('page', 'asc')->get();

        return ['Content' => $Content, 'Count' => $Count];
    }
 
    public function insert(Request $request)
    {
        $this->validate($request, [
            'ContentCode' => 'required|unique:STV_Contents|max:255',
            'Page' => 'required',
            'Title' => 'required',
            'Content' => 'required',
            'Language' => 'required',
            'Media' => 'required',
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
 
    public function delete(Request $request)
    {
        $Content = Content::findorfail($request->Id);
        $Content->delete();
 
        return response()->json(null, 204);
    }
}
